import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule } from '@angular/forms';
import { AnimationsModule } from '../animations/animations.module';



@NgModule({
  declarations: [
    ModalComponent
  ],
  providers: [ModalService],
  imports: [
    CommonModule,
    UtilsModule,
    AnimationsModule,
    FormsModule,
  ],
  exports: [ModalComponent]
})
export class SharedModule { }
