import { EventType, JSEvent } from './types';
import { Inject, Injectable } from '@angular/core';
import { JSEventBusService } from './jsevent-bus.service';
import { eventTypes } from './constants';
@Injectable({providedIn: 'root'})
export class JSEventManagerService {
  private eventTypes: EventType[] = eventTypes;
  private hasInitilized = false;
  private defaultHost = document.body.querySelector('app-root');
  private maxParentCounter = 50;
  constructor(
    private jSEventBus: JSEventBusService,
  ) {
    this._init();
  }

  _init() {
    if (this.hasInitilized) throw new Error('Events already Initialized!');
    this.hasInitilized = true;
    this.eventTypes.forEach((event) => {
      let { type, eventHost } = event;
      eventHost = eventHost ? eventHost : this.defaultHost;
      if (eventHost) {
        const eventRef = eventHost.addEventListener(type, (e) => {
          const {parents, children} = this.getRelatives(e)
          // const { parents, children } = this.getRelatives(e);
          this.jSEventBus.publish({ e, parents, children });

        });
      }
    });
  }

  getRelatives(e: JSEvent) {
    let currentElement: HTMLElement | null = e.target as HTMLElement;
    const parents = [];
    if (e.target) {
      const target: HTMLElement | null = e.target as HTMLElement;
      const children = target.children ? Array.from(target.children) : [];
      let counter = this.maxParentCounter;
      while (currentElement  && currentElement.parentElement && counter > 0) {
        currentElement = currentElement.parentElement;
        parents.push(currentElement);
        counter--;
        if (currentElement === e.currentTarget) {
          break
        }
      }
      return { parents, children };
    }
    return { parents: [], children: [] };
  }
}
