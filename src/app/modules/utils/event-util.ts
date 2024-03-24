import { JSEvent } from '../event-bus/types';

export default class EventUtil {
  eventData(e: JSEvent) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const { offsetX, offsetY } = e as MouseEvent;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      return {rect, offsetX, offsetY, centerX, centerY}
  }
}
