import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePageComponent } from './components/resume-page/resume-page.component';
import { FormsModule } from '@angular/forms';
import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeEditorComponent } from './components/resume-editor/resume-editor.component';
import { LayoutSelectorComponent } from './components/layout-selector/layout-selector.component';
import { EditableTextComponent } from './components/editable-text/editable-text.component';
import { UtilsModule } from '../utils/utils.module';
import { AnimationsModule } from '../animations/animations.module';
import { PipesModule } from '../pipes/pipes.module';
import { ResumeSectionComponent } from './components/resume-section/resume-section.component';
import { FontSelectorComponent } from './components/font-selector/font-selector.component';
import { ResumeRecordComponent } from './components/resume-record/resume-record.component';
import { ResumeHelperComponent } from './components/resume-helper/resume-helper.component';
import { NgxPrintModule } from 'ngx-print';
import { ResumeDocumentsComponent } from './components/resume-documents/resume-documents.component';
@NgModule({
  declarations: [
    ResumePageComponent,
    ResumeEditorComponent,
    LayoutSelectorComponent,
    EditableTextComponent,
    ResumeSectionComponent,
    FontSelectorComponent,
    ResumeRecordComponent,
    ResumeHelperComponent,
    ResumeDocumentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    AnimationsModule,
    PipesModule,
    NgxPrintModule,
    ResumeRoutingModule,
  ],
  exports: [ResumePageComponent, ResumeEditorComponent],
})
export class ResumeBuilderModule {}
