import { JSEvent } from '../event-bus/types';

export default class EventUtil {
  eventData(e: JSEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const { offsetX, offsetY, clientX, clientY } = e as MouseEvent;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    return { rect, offsetX, offsetY, centerX, centerY, clientX, clientY };
  }

  resizeToScreen(widthPercentage: number, heightPercentage: number) {
    const { innerWidth, innerHeight } = window;
    console.log({innerWidth, innerHeight});

    let width = innerWidth * (widthPercentage / 100);
    let height = innerHeight * (heightPercentage / 100);
    return [width, height];
  }
}
