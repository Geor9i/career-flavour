import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateModalService {
  private modalNotifier = new Subject();
  public modalMessenger$ = this.modalNotifier?.asObservable();
  constructor() {}
  open(component: Type<any>) {
    this.modalNotifier?.next(component);
  }

  private closeModal() {
    this.modalNotifier?.complete();
  }

  private submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }
}
