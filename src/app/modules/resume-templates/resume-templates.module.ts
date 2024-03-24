import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeTemplatesPageComponent } from './components/resume-templates-page/resume-templates-page.component';
import { ResumeTemplatesRoutingModule } from './resume-templates-routing.module';



@NgModule({
  declarations: [ResumeTemplatesPageComponent],
  imports: [
    CommonModule,
    ResumeTemplatesRoutingModule
  ],
  exports: [ResumeTemplatesPageComponent]
})
export class ResumeTemplatesModule { }
