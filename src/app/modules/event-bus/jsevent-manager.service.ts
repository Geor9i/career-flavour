import { EventType, JSEvent } from './types';
import { Inject, Injectable } from '@angular/core';
import { JSEventBusService } from './jsevent-bus.service';
import { eventTypes } from './constants';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class JSEventManagerService {
  private eventTypes: EventType[] = eventTypes;
  private hasInitilized = false;
  private defaultHost = this.document.body.querySelector('app-root');
  constructor(
    private jSEventBus: JSEventBusService,
    @Inject(DOCUMENT) private document: Document
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
          const { parents, children } = this.getRelatives(
            e,
            eventHost as HTMLElement
          );
          this.jSEventBus.publish({ e, parents, children });
        });
      }
    });
  }

  getRelatives(e: JSEvent, eventHost: HTMLElement) {
    let currentElement: HTMLElement | null = e.target as HTMLElement;
    const parents = [];
    if (e.target) {
      const target: HTMLElement | null = e.target as HTMLElement;
      const children = target.children ? Array.from(target.children) : [];
      while (currentElement) {
        if (currentElement?.parentElement) {
          currentElement = currentElement?.parentElement;
          parents.push(currentElement);
        }
        if (currentElement === eventHost) {
          break
        }
      }
      return { parents, children };
    }
    return { parents: [], children: [] };
  }
}
