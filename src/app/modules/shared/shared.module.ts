import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { UtilsModule } from '../utils/utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimationsModule } from '../animations/animations.module';
import { TemplateModalComponent } from './templateModal/templateModal.component';
import { TemplateModalService } from './templateModal/templateModal.service';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { SharedRoutingModule } from './shared-routing.module';
import { FireModule } from '../fire/fire.module';



@NgModule({
  declarations: [
    ModalComponent,
    TemplateModalComponent,
    AuthFormComponent
  ],
  providers: [ModalService, TemplateModalService],
  imports: [
    CommonModule,
    UtilsModule,
    AnimationsModule,
    FireModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule
  ],
  exports: [ModalComponent, TemplateModalComponent, AuthFormComponent]
})
export class SharedModule { }
