export interface BusData {
  event: string;
  data?: { [key: string]: boolean | string };
}

export interface Subscribers {
  [subscriberId: string]: Subscriber;
}

export interface Subscriber {
  eventTypes: { [eventType: string]: Subscription[] | [] };
  getSubEvents?: (params: PublishParams) => number[] | null;
}

export interface Subscription {
  options: JSEventOptions;
  callback: (e: JSEvent) => void;
  id: number;
}

export interface JSEventOptions {
  bubling?: boolean;
  target?: Element | Element[] | string | string[] | null;
  stopPropagation?: boolean;
}

export type JSEvent = MouseEvent | KeyboardEvent | TouchEvent | Event;

export interface EventType {
  type: string;
  eventHost?: Element | null;
}

export interface PublishParams {
  e: JSEvent;
  parents: Element[];
  children: Element[];
}
