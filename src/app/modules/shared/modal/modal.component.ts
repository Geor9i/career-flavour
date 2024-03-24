import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() size? = '';
  @Input() title? = '';
  @Input() type? = 'default';
  @Input() buttons? = [{ name: 'Submit', action: 'submit' }];
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  constructor(
    private ElementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}
  getAction(action: string) {
    const actions: { [key: string]: () => void } = {
      submit: this.submit.bind(this),
      cancel: this.close.bind(this),
    };
    return actions[action]();
  }

  close(): void {
    this.ElementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.ElementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
}
