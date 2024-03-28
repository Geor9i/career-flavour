export interface TransmissionData {
  [key: string]: boolean | string | object | number;
}

export interface BusData {
  event: string;
  data?: { [key: string]: boolean | string | object | TransmissionData | number};
}

export interface Subscribers {
  [subscriberId: string]: Subscriber;
}

export interface Subscriber {
  eventTypes: { [eventType: string]: Subscription[] | [] };
  getSubEvents?: (params: PublishParams) => number[] | null;
}

export type SubCallback = (e: JSEvent) => void;

export interface Subscription {
  options: JSEventOptions;
  callback: SubCallback;
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
  eventHost?: Element | Window | null;
}

export interface PublishParams {
  e: JSEvent;
  parents: Element[];
  children: Element[];
}
