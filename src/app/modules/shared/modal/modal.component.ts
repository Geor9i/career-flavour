import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  QueryList,
  ViewChildren,
  AfterContentInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements AfterContentInit{
  @Input() size? = '';
  @Input() title? = '';
  @Input() buttons? = [{ name: 'Submit', action: 'submit' }];
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  @ViewChildren(NgForm) dynamicForms!: QueryList<NgForm>;

  constructor(private ElementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
      console.log(this.dynamicForms)
    }, 1000);
  }

  getAction(action: string) {
    const actions:{[key: string]: () => void} = { submit: this.submit.bind(this), cancel: this.close.bind(this) };
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
