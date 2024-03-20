import {
  Injectable,
  TemplateRef,
  Inject,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Button } from './types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalNotifier?: Subject<string>;

  constructor(@Inject(DOCUMENT) private document: Document, private environmentInjector: EnvironmentInjector
    ) {}

  open(content: TemplateRef<unknown>, options?: { size?: string; title?: string, buttons?: Button[] }
  ) {

    const conetentViewRef = content.createEmbeddedView(null);
    const contentNodes = conetentViewRef.rootNodes;
    const modalComponentRef = createComponent(ModalComponent, {environmentInjector: this.environmentInjector, projectableNodes: [contentNodes]});

    modalComponentRef.instance.buttons = options?.buttons;
    modalComponentRef.instance.size = options?.size || 'medium';
    modalComponentRef.instance.title = options?.title || 'Modal';
    modalComponentRef.instance.closeEvent.subscribe(() => {
      this.closeModal();
    })
    modalComponentRef.instance.submitEvent.subscribe(() => {
      this.submitModal();
    })

    this.document.body.appendChild(modalComponentRef.location.nativeElement)

    modalComponentRef.hostView.detectChanges();
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();

  }
}
