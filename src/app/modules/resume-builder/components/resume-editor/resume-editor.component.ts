import { JSEventBusService } from 'src/app/modules/event-bus/jsevent-bus.service';
import { UtilService } from './../../../utils/util.service';
import { TemplateModalService } from './../../../shared/templateModal/templateModal.service';
import { Component, OnInit, Type } from '@angular/core';
import { ResumePageComponent } from '../resume-page/resume-page.component';
import { LayoutSelectorComponent } from '../layout-selector/layout-selector.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume-editor',
  templateUrl: './resume-editor.component.html',
  styleUrls: ['./resume-editor.component.css'],
})
export class ResumeEditorComponent implements OnInit {
  public resumePage!: Type<any>;
  constructor(
    private templateModalService: TemplateModalService,
    private utilService: UtilService,
    private jsEventBusService: JSEventBusService
  ) {}
  private eventBusSubscription!: Subscription;
  private jsEventUnsubscribeArr: (() => void)[] = []
  private eventUtil = this.utilService.eventUtil;
  ngOnInit(): void {
    this.resumePage = ResumePageComponent;
  }
  private layoutEditorStyles: {} = {};
  private backdropStyles: {} = {};

  openLayouts(e: Event) {
    const { clientX, clientY } = this.eventUtil.eventData(e);
    const [width, height] = this.eventUtil.resizeToScreen(50, 60);
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
    this.eventBusSubscription = this.templateModalService
      .open(LayoutSelectorComponent, {
        styles: this.layoutEditorStyles,
        backdropStyles: this.backdropStyles,
        openTransmission: true
      })
      .subscribe((observable) => {
        console.log(observable);

        if (observable.data && observable.data.hasOwnProperty('confirm')) {
          this.eventBusSubscription.unsubscribe();
        }
      });
  }
}
