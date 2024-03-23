import { EventBusService } from './../../event-bus/event-bus.service';
import { Injectable, Type } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateModalService {
  private modalSubject$$ = new Subject();
  public modalMessenger$ = this.modalSubject$$?.asObservable();
  private templateModalSubscription: Subscription | undefined;
  constructor(private eventBus: EventBusService) {
    this.templateModalSubscription = this.eventBus
    .on('templateModalOutput')
    .subscribe((data) => this.modalSubject$$.next(data));
  }

  open(component: Type<any>): Observable<unknown> {
    this.modalSubject$$?.next(component);
    return this.modalMessenger$
  }

  private closeModal() {
    this.modalSubject$$?.complete();
  }

  private submitModal() {
    this.modalSubject$$?.next('confirm');
    this.closeModal();
  }
}
