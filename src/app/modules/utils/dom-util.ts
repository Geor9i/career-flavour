import MathUtil from './mathUtil';
import StringUtil from './string-util';

export default class DomUtil {
  private stringUtil = new StringUtil();
  private mathUtil = new MathUtil();

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
    let currentParent = child.parentElement;
    let counter = 1;
    const parents: HTMLElement[] = [];
    while (
      currentParent &&
      counter <= maxParentCount &&
      currentParent !== document.body
    ) {
      parents.push(currentParent);
      currentParent = currentParent.parentElement;
      counter++;
    }
    return parents;
  }

  getUnitValue(size: string) {
    let valueString = this.stringUtil.filterString(size, [
      {
        symbol: '\\d',
      },
      {
        symbol: '.',
      },
    ]);
    let unit = this.stringUtil.filterString(size, [
      {
        symbol: '\\w',
        remove: true,
      },
    ]);
    return [valueString, unit];
  }

  elementData(element: Element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    return { rect, centerX, centerY };
  }

  getGridRelativeStyles(gridElement: Element) {
    const styles = getComputedStyle(gridElement);
    const { width, height } = this.elementData(gridElement).rect;
    const templateRows = styles.getPropertyValue('grid-template-rows');
    const templateColumns = styles.getPropertyValue('grid-template-columns');
    let rows = templateRows.split(' ').map((valueStr) => {
      let [value, unit] = this.getUnitValue(valueStr);
      return Number(value) / height;
    });
    let cols = templateColumns.split(' ').map((valueStr) => {
      let [value, unit] = this.getUnitValue(valueStr);
      return Number(value) / width;
    });

    const averagedRows = this.mathUtil.evenArrRatioToSum(rows, 100, 2);
    const averagedCols = this.mathUtil.evenArrRatioToSum(cols, 100, 2);

    const gridTemplateRows = averagedRows.map((row) => `${row}%`).join(' ');
    const gridTemplateColumns = averagedCols.map((col) => `${col}%`).join(' ');

    return { gridTemplateColumns, gridTemplateRows };
  }

  getGridChildStyles(child: Element) {
    const styles = getComputedStyle(child);
    const gridRowEnd = styles.getPropertyValue('grid-row-end');
    const gridRowStart = styles.getPropertyValue('grid-row-start');
    const gridColumnStart = styles.getPropertyValue('grid-column-start');
    const gridColumnEnd = styles.getPropertyValue('grid-column-end');
    return { gridRowStart, gridColumnEnd, gridRowEnd, gridColumnStart };

  }
}
