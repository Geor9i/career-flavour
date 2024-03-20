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


}
