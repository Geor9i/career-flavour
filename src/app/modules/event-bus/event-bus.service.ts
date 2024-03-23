import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BusData } from './types';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private transmitter$$ = new Subject<BusData>()
  constructor() {}

  emit(event: BusData) {
    this.transmitter$$.next(event);
  }

  on(eventType: string): Observable<BusData> {
    return this.transmitter$$
      .asObservable()
      .pipe(filter((data) => data.event === eventType));
  }
}
