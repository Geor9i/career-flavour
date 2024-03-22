import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { TemplateModalService } from './templateModal.service';

@Component({
  selector: 'app-template-modal',
  templateUrl: './templateModal.component.html',
  styleUrls: ['./templateModal.component.css'],
})
export class TemplateModalComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  constructor(
    private templateModalService: TemplateModalService,
    private cdr: ChangeDetectorRef
  ) {}
  template: any;
  isActive = false;

  ngOnInit(): void {
    this.templateModalService.modalMessenger$?.subscribe((component) => {
      if (component) {
        this.template = component;
        this.isActive = true;
      }
    });
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
    this.closeEvent.emit();
  }

  submit(): void {
    this.isActive = false;
    this.submitEvent.emit();
  }
}
