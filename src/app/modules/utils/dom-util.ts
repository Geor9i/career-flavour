
export default class DomUtil {

  hasChild(parent: Element, ...children: Element[]) {
    const directChildren = Array.from(parent.children);
    for (const child of children) {
        if (directChildren.includes(child)) {
            return true;
        }
    }
    return false;
}

getParents(child: HTMLElement, maxParentCount = 20) {
  let currentParent = child.parentElement
  let counter = 1;
  const parents: HTMLElement[] = [];
  while(currentParent && counter <= maxParentCount && currentParent !== document.body) {
  parents.push(currentParent);
  currentParent = currentParent.parentElement;
    counter++;
  }
  return parents;
}

}
