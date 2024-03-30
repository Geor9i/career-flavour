import { JSEvent } from '../event-bus/types';
import ObjectUtil from './object.util';

export default class EventUtil {
  private objUtil = new ObjectUtil();

  eventData(e: JSEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const { offsetX, offsetY, clientX, clientY } = e as MouseEvent;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    return { rect, offsetX, offsetY, centerX, centerY, clientX, clientY };
  }

  resizeToScreen(widthPercentage: number, heightPercentage: number) {
    const { innerWidth, innerHeight } = window;

    let width = innerWidth * (widthPercentage / 100);
    let height = innerHeight * (heightPercentage / 100);
    return [width, height];
  }

  elementData(element: Element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    return { rect, centerX, centerY };
  }
  //  { x: 442.76666259765625, y: -22, width: 174.4499969482422, height: 246.88333129882812, top: -22, right: 617.2166595458984, bottom: 224.88333129882812, left: 442.76666259765625 }

  getObjectPlacement(
    parentRect: { [key: string]: number },
    innerRect: DOMRect
  ) {
    return {
      outerEdgeDistanceXL: innerRect['left'] - parentRect['left'],
      outerEdgeDistanceYT: innerRect['top'] - parentRect['top'],
      innerEdgeDistanceXL: innerRect['right'] - parentRect['left'],
      innerEdgeDistanceYT: innerRect['bottom'] - parentRect['top'],
      outerEdgeDistanceXR: parentRect['right'] - innerRect['right'],
      outerEdgeDistanceYB: parentRect['bottom'] - innerRect['bottom'],
      innerEdgeDistanceXR: parentRect['right'] - innerRect['left'],
      innerEdgeDistanceYB: parentRect['bottom'] - innerRect['top'],
    };
  }



}

