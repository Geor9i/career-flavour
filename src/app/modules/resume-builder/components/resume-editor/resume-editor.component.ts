import { TemplateModalService } from './../../../shared/templateModal/templateModal.service';
import { Component, OnInit } from '@angular/core';
import { ResumePageComponent } from '../resume-page/resume-page.component';
import { LayoutSelectorComponent } from '../layout-selector/layout-selector.component';

@Component({
  selector: 'app-resume-editor',
  templateUrl: './resume-editor.component.html',
  styleUrls: ['./resume-editor.component.css'],
})
export class ResumeEditorComponent implements OnInit {
  public resumePage: any;
  constructor(private templateModalService: TemplateModalService){}
  ngOnInit(): void {
    this.resumePage = ResumePageComponent;
  }

  openLayouts() {
    this.templateModalService.open(LayoutSelectorComponent).subscribe(observable => {
    console.log(observable);
    })
  }
}
