import { JSEventBusService } from 'src/app/modules/event-bus/jsevent-bus.service';
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
    private utilService: UtilService,
    private jsEventBusService: JSEventBusService
  ) {}
  private jsEventUnsubscribeArr: (() => void)[] = []
  private eventUtil = this.utilService.eventUtil;
  ngOnInit(): void {
    this.resumePage = ResumePageComponent;
  }
  private layoutEditorStyles: {} = {};
  private backdropStyles: {} = {};

  openLayouts(e: Event) {
    const { clientX, clientY } = this.eventUtil.eventData(e);
    const [width, height] = this.eventUtil.resizeToScreen(50, 50);
    this.layoutEditorStyles = {
      'background-color': 'rgb(36, 104, 136)',
      top: `${clientY}px`,
      left: `${clientX}px`,
      transform: 'translate(-50%, 2em)',
      'border-radius': '17px',
      'box-shadow': 'none',
      'width': `${width}px`,
      'height': `${height}px`,
    };
    this.backdropStyles = {
      backdropFilter: 'blur(0)',
    };
    this.templateModalService
      .open(LayoutSelectorComponent, {
        styles: this.layoutEditorStyles,
        backdropStyles: this.backdropStyles,
      })
      .subscribe((observable) => {
        // console.log(observable);
      });
  }
}
