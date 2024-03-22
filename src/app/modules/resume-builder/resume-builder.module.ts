import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePageComponent } from './components/resume-page/resume-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResumePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ResumePageComponent]
})
export class ResumeBuilderModule {

}
