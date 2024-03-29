import {
  Component,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Type,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { TemplateModalService } from './templateModal.service';
import { EventBusService } from '../../event-bus/event-bus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template-modal',
  templateUrl: './templateModal.component.html',
  styleUrls: ['./templateModal.component.css'],
})
export class TemplateModalComponent implements OnInit, OnDestroy {
  constructor(
    private templateModalService: TemplateModalService,
    private eventBus: EventBusService
  ) {}
  private templateModalServiceSubscription: Subscription | undefined;
  private eventBusSubscription: Subscription | undefined;
  template: any;
  modalStyles = {};
  backdropStyles = {};
  isActive = false;

  ngOnInit(): void {
    this.templateModalServiceSubscription =
      this.templateModalService.modalCompMessenger$?.subscribe(({component, options}) => {
        if (options?.styles) {
          this.modalStyles = options.styles;
        }
        if (options?.backdropStyles) {
          this.backdropStyles = options.backdropStyles;
        }
        if (component instanceof Type) {
          this.template = null;
          this.template = component;
          this.isActive = true;
        }
      });
    this.eventBusSubscription = this.eventBus
      .on('TemplateModalContentOutput')
      .subscribe((observer) => {
        if (!observer) return
        if (observer && observer.hasOwnProperty('data') && observer.data?.hasOwnProperty('confirm')) {
          observer.data['confirm'] ? this.submit() : this.close();
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
