import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';



@NgModule({
  declarations: [
    ModalComponent
  ],
  providers: [ModalService],
  imports: [
    CommonModule
  ],
  exports: [ModalComponent]
})
export class SharedModule { }
