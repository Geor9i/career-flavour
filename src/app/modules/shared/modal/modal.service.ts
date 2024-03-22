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
  private modalNotifier?: Subject<any>;

  constructor(@Inject(DOCUMENT) private document: Document, private environmentInjector: EnvironmentInjector) {}

  open(content: TemplateRef<unknown>, options?: { size?: string; title?: string, buttons?: Button[], type?: string}
  ) {

    const contentViewRef = content.createEmbeddedView(null);
    const contentNodes = contentViewRef.rootNodes;
    const modalComponentRef = createComponent(ModalComponent, {environmentInjector: this.environmentInjector, projectableNodes: [contentNodes]});

    modalComponentRef.instance.buttons = options?.buttons;
    modalComponentRef.instance.size = options?.size;
    modalComponentRef.instance.title = options?.title;
    modalComponentRef.instance.type = options?.type;
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

 private closeModal() {
    this.modalNotifier?.complete();
  }

  private submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();

  }
}
