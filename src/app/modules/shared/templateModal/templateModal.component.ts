import {
  Component,
  OnInit,
  OnDestroy,
  Type,
} from '@angular/core';
import { TemplateModalService } from './templateModal.service';
import { EventBusService } from '../../event-bus/event-bus.service';
import { Subscription } from 'rxjs';
import { TransmissionData } from '../../event-bus/types';

@Component({
  selector: 'app-template-modal',
  templateUrl: './templateModal.component.html',
  styleUrls: ['./templateModal.component.css'],
})
export class TemplateModalComponent implements OnInit, OnDestroy {
  constructor(
    private templateModalService: TemplateModalService,
    private eventBus: EventBusService,
  ) {}
  private templateModalServiceSubscription: Subscription | undefined;
  private eventBusSubscription: Subscription | undefined;
  private openTransmission = false;
  template: any;
  modalStyles = {};
  backdropStyles = {};
  isActive = false;

  ngOnInit(): void {
    this.templateModalServiceSubscription =
      this.templateModalService.modalCompMessenger$?.subscribe(({component, options}) => {
        // Reset styles
        this.modalStyles = {};
        this.backdropStyles = {};

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
        if (options?.openTransmission) {
          this.openTransmission = true;
        }

      });
    this.eventBusSubscription = this.eventBus
      .on('TemplateModalContentOutput')
      .subscribe((observer) => {

        if (!observer) return

        if (observer.data) {
          if (this.openTransmission && !observer.data.hasOwnProperty('confirm')) {
            this.send(observer.data);
          } else if (observer.data?.hasOwnProperty('confirm')) {
            observer.data['confirm'] ? this.submit(observer.data) : this.close();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.templateModalServiceSubscription?.unsubscribe();
    this.eventBusSubscription?.unsubscribe();
  }

  close(): void {
    this.isActive = false;
    this.eventBus.emit({
      event: 'templateModalOutput',
      data: { confirm: false },
    });
  }

  send(data: TransmissionData): void {
    this.eventBus.emit({
      event: 'templateModalOutput',
      data,
    });
  }

  submit(data: object): void {
    this.isActive = false;
    this.eventBus.emit({
      event: 'templateModalOutput',
      data: { confirm: true, data },
    });
  }
}
