import { comp } from './../types';
import { EventBusService } from './../../event-bus/event-bus.service';
import { Injectable, Type } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BusData } from '../../event-bus/types';
import { templateModalOptions } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TemplateModalService {
  private modalCompSubject$$ = new Subject<comp>();
  private modalDataSubject$$ = new Subject<BusData>();
  modalCompMessenger$ = this.modalCompSubject$$?.asObservable();
  modalDataMessenger$ = this.modalDataSubject$$?.asObservable();
  private templateModalSubscription: Subscription | undefined;
  constructor(private eventBus: EventBusService) {
    this.templateModalSubscription = this.eventBus
      .on('templateModalOutput')
      .subscribe((data) => this.modalDataSubject$$.next(data));
  }

  open(component: Type<any>, options?: templateModalOptions) {
    this.modalCompSubject$$?.next({ component, options });
    return this.modalDataMessenger$;
  }
}
