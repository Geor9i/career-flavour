import { Component, ChangeDetectorRef, OnInit, OnDestroy, Type } from '@angular/core';
import { TemplateModalService } from './templateModal.service';
import { EventBusService } from '../../event-bus/event-bus.service';
import { Subscription } from 'rxjs';
import { TMCO } from '../types';

@Component({
  selector: 'app-template-modal',
  templateUrl: './templateModal.component.html',
  styleUrls: ['./templateModal.component.css'],
})
export class TemplateModalComponent implements OnInit, OnDestroy {
  constructor(
    private templateModalService: TemplateModalService,
    private cdr: ChangeDetectorRef,
    private eventBus: EventBusService
  ) {}
  private templateModalServiceSubscription: Subscription | undefined;
  private eventBusSubscription: Subscription | undefined;
  template: any;
  isActive = false;

  ngOnInit(): void {
    this.templateModalServiceSubscription =
      this.templateModalService.modalMessenger$?.subscribe((component) => {
        if (component instanceof Type) {
          this.template = component;
          this.isActive = true;
        }
      });
    this.eventBusSubscription = this.eventBus
      .on('TemplateModalContentOutput')
      .subscribe((observer) => {
        if (observer.data && observer.data.hasOwnProperty('confirm')) {
          (observer.data as TMCO).confirm ? this.submit() : this.close();
        }
      });
  }

  ngOnDestroy(): void {
    this.templateModalServiceSubscription?.unsubscribe();
    this.eventBusSubscription?.unsubscribe();
  }

  getAction(action: string) {
    const actions: { [key: string]: () => void } = {
      submit: this.submit.bind(this),
      cancel: this.close.bind(this),
    };
    return actions[action]();
  }

  close(): void {
    this.isActive = false;
    this.eventBus.emit({
      event: 'templateModalOutput',
      data: { confirm: false },
    });
  }

  submit(): void {
    this.isActive = false;
    this.eventBus.emit({
      event: 'templateModalOutput',
      data: { confirm: true },
    });
  }
}
