import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ModalComponent } from './modal.component';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalNotifier?: Subject<string>
  // constructor(
  //   private resolver: ComponentFactoryResolver,
  //   private injector: Injector,
  //   @Inject(DOCUMENT) private document: Document
  // ) {}

  // open(content: TemplateRef<unknown>, options?: { size?: string; title?: string }) {
  //   const modalComponentFactory =
  //     this.resolver.resolveComponentFactory(ModalComponent);
  //   const contentViewRef = content.createEmbeddedView(null);
  //   const modalcomponent = modalComponentFactory.create(this.injector, [
  //     contentViewRef.rootNodes,
  //   ]);
  //   modalcomponent.instance.size = options?.size;
  //   modalcomponent.instance.title = options?.title;
  //   modalcomponent.instance.closeEvent.subscribe(() => this.closeModal())
  //   modalcomponent.instance.submitEvent.subscribe(() => this.submitModal())

  //   modalcomponent.hostView.detectChanges();
  //   this.document.body.appendChild(modalcomponent.location.nativeElement);
  //   this.modalNotifier = new Subject();
  //   return this.modalNotifier?.asObservable();
  // }
  constructor(private viewContainerRef: ViewContainerRef){}

  open(content: TemplateRef<unknown>, options?: { size?: string; title?: string }) {
    const component = this.viewContainerRef.createComponent(ModalComponent);
    
  }



  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal() {
    this.modalNotifier?.next('value');
    this.closeModal()
  }
}
