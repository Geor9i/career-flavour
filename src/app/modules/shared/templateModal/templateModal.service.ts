import { EventBusService } from './../../event-bus/event-bus.service';
import { Injectable} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BusData } from '../../event-bus/types';
import { comp } from '../types';

@Injectable({
  providedIn: 'root',
})


export class TemplateModalService {
  private modalCompSubject$$ = new Subject<comp>();
  private modalDataSubject$$ = new Subject<BusData>();
  public modalCompMessenger$ = this.modalCompSubject$$?.asObservable();
  public modalDataMessenger$ = this.modalDataSubject$$?.asObservable();
  private templateModalSubscription: Subscription | undefined;
  constructor(private eventBus: EventBusService) {
    this.templateModalSubscription = this.eventBus
    .on('templateModalOutput')
    .subscribe((data) => this.modalDataSubject$$.next(data));
  }

  open(component: comp){
    this.modalCompSubject$$?.next(component);
    return this.modalDataMessenger$
  }
}
