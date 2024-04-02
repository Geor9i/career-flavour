import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeTemplatesPageComponent } from './components/resume-templates-page/resume-templates-page.component';
import { ResumeTemplatesRoutingModule } from './resume-templates-routing.module';
import { UtilsModule } from '../utils/utils.module';
import { MyTemplatesComponent } from './components/my-templates/my-templates.component';



@NgModule({
  declarations: [ResumeTemplatesPageComponent, MyTemplatesComponent],
  imports: [
    CommonModule,
    UtilsModule,
    ResumeTemplatesRoutingModule
  ],
  exports: [ResumeTemplatesPageComponent]
})
export class ResumeTemplatesModule { }
