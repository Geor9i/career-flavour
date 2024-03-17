import { Component, EventEmitter, Input, OnDestroy, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
@Input() size? = 'md';
@Input() title? = 'Modal title';
@Output() closeEvent = new EventEmitter();
@Output() submitEvent = new EventEmitter();
constructor(private ElementRef: ElementRef) {

}

close():void {
  this.ElementRef.nativeElement.remove();
  this.closeEvent.emit();
}

submit():void {
  this.ElementRef.nativeElement.remove();
  this.submitEvent.emit();
}
}
