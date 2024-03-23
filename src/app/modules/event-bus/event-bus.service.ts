import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Event {
  event: string;
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private transmitter$$ = new Subject<Event>()
  constructor() {}

  emit(event: Event) {
    this.transmitter$$.next(event);
  }

  on(eventType: string): Observable<Event> {
    return this.transmitter$$
      .asObservable()
      .pipe(filter((data) => data.event === eventType));
  }
}
