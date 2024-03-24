import { Injectable } from '@angular/core';
import {
  JSEventOptions,
  Subscriber,
  PublishParams,
  Subscribers,
  JSEvent,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class JSEventBusService {
  private eventId = 0;
  private subscribers: Subscribers = {};

  subscribe(
    subscriberId: string,
    eventType: string,
    callback: (e: JSEvent) => void,
    options?: JSEventOptions
  ) {
    const eventId = this.eventId++;
    if (!this.subscribers.hasOwnProperty(subscriberId)) {
      this.subscribers[subscriberId] = {
        eventTypes: {[eventType]: [this.buildSubscription(callback, eventId, options)]},
        getSubEvents: this._getSubscriptionEvents,
      };
    } else {
      this.subscribers[subscriberId] = {
        ...this.subscribers[subscriberId],
        eventTypes: {
          ...(this.subscribers[subscriberId].eventTypes || {}),
          [eventType]: [
            ...(this.subscribers[subscriberId].eventTypes[eventType] || []),
            this.buildSubscription(callback, eventId, options),
          ],
        },
      };
    }
    const unsubscribe = () => {
      const index = this.subscribers[subscriberId].eventTypes[
        eventType
      ].findIndex((subscription) => subscription.id === eventId);
      this.subscribers[subscriberId].eventTypes[eventType].splice(index, 1);
    };
    return unsubscribe;
  }
  private buildSubscription(
    callback: (() => void) | ((e: JSEvent) => void),
    id: number,
    options?: JSEventOptions
  ) {
    const defaultOptions = {
      bubling: true,
      target: null,
      stopPropagation: false,
    };
    let finalOptions;
    if (options) {
      finalOptions = {
        ...defaultOptions,
        ...options,
      };
    } else {
      finalOptions = { ...defaultOptions };
    }

    return {
      callback,
      id,
      options: finalOptions,
    };
  }

  publish({ e, parents, children }: PublishParams) {
    for (let subscriberId in this.subscribers) {
      const subscriber = this.subscribers[subscriberId];
      if (subscriber && subscriber.getSubEvents) {
        const subscriptionIds = subscriber.getSubEvents({
          e,
          parents,
          children,
        });
        if (subscriptionIds && subscriptionIds.length > 0 && subscriber.eventTypes[e.type]) {
          const subscriptionIdsSet = new Set(subscriptionIds);
          subscriber.eventTypes[e.type].forEach((subscription) => {
            if (subscriptionIdsSet.has(subscription.id)) {
              subscription.callback(e);
            }
          });
        }
      }
    }
  }
  private _getSubscriptionEvents({ e, parents, children }: PublishParams) {
    const subscriberIds: number[] = [];
    const subscriber = this as unknown as Subscriber;
    if (subscriber['eventTypes'].hasOwnProperty(e.type)) {
      const subscriptions = subscriber['eventTypes'][e.type];
      subscriptions.forEach((subscription) => {
        const { bubling, target, stopPropagation } = subscription.options;
        if (target) {
          const targets = Array.isArray(target) ? target : [target];
          const targetElements = targets.reduce(
            (acc: Element[], elementData) => {
              if (typeof elementData === 'string') {
                const elements = Array.from(
                  document.querySelectorAll(elementData)
                ).filter((el) => el !== null);
                return acc.concat(elements);
              } else {
                return acc.concat(elementData);
              }
            },
            []
          );
          for (const element of targetElements) {
            if (
              e.target === element ||
              (bubling && parents.includes(element)) ||
              (!bubling && children.includes(element))
            ) {
              subscriberIds.push(subscription.id);
              break;
            }
          }
        } else {
          subscriberIds.push(subscription.id);
        }
      });
      return subscriberIds.length > 0 ? subscriberIds : null;
    }
    return null;
  }

}
