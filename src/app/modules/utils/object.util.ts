export default class ObjectUtil {

  mergeSort<T>(arr: T[], callback:(a:T, b:T) => number): T[]{
    let split = <T>(arr: T[], callback:(a:T, b:T) => number):T[] => {
        if (arr.length <= 1) {
            return arr;
        }
        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        const sortedLeft = split(left, callback);
        const sortedRight = split(right, callback);

        return merge(sortedLeft, sortedRight, callback);
    }
    let merge = <T>(leftArr: T[], rightArr: T[], callback: (leftArr: T, right: T) => number): T[] => {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
                let currentSortResult = callback(leftArr[leftIndex], rightArr[rightIndex]);
                currentSortResult < 0 ? result.push(leftArr[leftIndex++]) : result.push(rightArr[rightIndex++]);
        }
        result.push(...leftArr.slice(leftIndex), ...rightArr.slice(rightIndex));
        return result;
    }
    return split(arr, callback);
}

reduceToArr(obj: any, { addParams = {}, setId = false, ownId = false, orderData = false }: { addParams?: any; setId?: boolean; ownId?: boolean; orderData?: boolean } = {}): any[] {
  let arr = Object.keys(obj).reduce((arr: any[], key: string, i: number) => {
    let element = obj[key];
    if (addParams) {
      Object.keys(addParams).forEach((paramKey: string) => {
        element[paramKey] = addParams[paramKey];
      });
    }
    if (setId) {
      element.id = i;
    } else if (ownId) {
      element.id = key;
    }
    arr.push(element);
    return arr;
  }, []);
  if (orderData) {
    arr = this.mergeSort(arr, (a, b)=> a.index - b.index)
  }
  return arr
}

objFromStringArr(arr: any[], data: any) {
  return arr.reduce((acc, curr) => {
    let dataType = this.typeof(data);
    switch (dataType) {
      case "array":
        acc[curr] = [...data];
        break;
      case "object":
        acc[curr] = { ...data };
        break;
      default:
        acc[curr] = data;
        break;
    }
    return acc;
  }, {});
}

reduceToObj(arr: any[], keyProp: string, orderData = true) {
  return arr.reduce((obj: any, curr, index) => {
    obj[curr[keyProp]] = orderData ?{...curr, index}: curr;
    return obj
  }, {})
}

setNestedProperty(object: any, propPath: string, setValue: any = {}): any {
  let targetObject = {... object}
  let propNameArr = propPath.split(".");
  let lastProp = propNameArr.pop();
  if (!lastProp) {
    return targetObject;
  }
  let currentObj = targetObject;
  for (const prop of propNameArr) {
    if (!currentObj[prop]) {
      currentObj[prop] = {};
    }
    currentObj = currentObj[prop];
  }
  currentObj[lastProp] = setValue;
  return targetObject;
}

getNestedProperty(targetObject: any, propPath: string) {
  let propNameArr = propPath.split(".");
  if (propNameArr.length === 1) {
    return targetObject[propPath] ?? null;
  }
  return propNameArr.reduce((obj, prop) => {
    return obj && obj[prop] ? obj[prop] : null;
  }, targetObject);
}

typeof(target: any) {
  if (target === null) return null;
  if (target === undefined) return undefined;
  let types = ["number", "string", "object", "boolean"];
  let targetType = typeof target;
  if (!types.includes(targetType)) return targetType;

  if (targetType !== "object") {
    return targetType;
  } else {
    return Array.isArray(target) ? "array" : "object";
  }
}


}
