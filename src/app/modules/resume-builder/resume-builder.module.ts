import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePageComponent } from './components/resume-page/resume-page.component';
import { FormsModule } from '@angular/forms';
import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeEditorComponent } from './components/resume-editor/resume-editor.component';
import { LayoutSelectorComponent } from './components/layout-selector/layout-selector.component';
import { EditableTextComponent } from './components/editable-text/editable-text.component';



@NgModule({
  declarations: [
    ResumePageComponent,
    ResumeEditorComponent,
    LayoutSelectorComponent,
    EditableTextComponent,
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    FormsModule
  ],
  exports: [ResumePageComponent, ResumeEditorComponent]
})
export class ResumeBuilderModule {

}
