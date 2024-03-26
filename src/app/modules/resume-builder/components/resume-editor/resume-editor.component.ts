import { UtilService } from './../../../utils/util.service';
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
  constructor(
    private templateModalService: TemplateModalService,
    private utilService: UtilService
  ) {}
  private eventUtil = this.utilService.eventUtil;
  ngOnInit(): void {
    this.resumePage = ResumePageComponent;
  }

  openLayouts(e: Event) {
    const { clientX, clientY } = this.eventUtil.eventData(e);
    const layoutEditorStyles = {
      'background-color': 'rgb(90 108 135)',
      top: `${clientY}px`,
      left: `${clientX}px`,
      transform: 'translate(-50%, 10%)',
    };
    const backdropStyles = {
      backdropFilter: 'blur(0)',
    };
    this.templateModalService
      .open(LayoutSelectorComponent, {
        styles: layoutEditorStyles,
        backdropStyles,
      })
      .subscribe((observable) => {
        console.log(observable);
      });
  }
}
