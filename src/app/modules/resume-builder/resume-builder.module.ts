import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePageComponent } from './components/resume-page/resume-page.component';
import { FormsModule } from '@angular/forms';
import { ResumeRoutingModule } from './resume-routing.module';



@NgModule({
  declarations: [
    ResumePageComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    FormsModule
  ],
  exports: [ResumePageComponent]
})
export class ResumeBuilderModule {

}
