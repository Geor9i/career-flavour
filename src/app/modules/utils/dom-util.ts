
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

}
