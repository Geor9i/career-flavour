import { IdObj, PageValues } from './../../types';
import { JSEventBusService } from 'src/app/modules/event-bus/jsevent-bus.service';
import { UtilService } from './../../../utils/util.service';
import { TemplateModalService } from './../../../shared/templateModal/templateModal.service';
import { Component, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { ResumePageComponent } from '../resume-page/resume-page.component';
import { LayoutSelectorComponent } from '../layout-selector/layout-selector.component';
import { Subscription } from 'rxjs';
import { PageManagerService } from '../../page-manager.service';
import { GridData } from '../../types';
import { FontSelectorComponent } from '../font-selector/font-selector.component';
import { ResumeHelperComponent } from '../resume-helper/resume-helper.component';

@Component({
  selector: 'app-resume-editor',
  templateUrl: './resume-editor.component.html',
  styleUrls: ['./resume-editor.component.css'],
})
export class ResumeEditorComponent implements OnInit, OnDestroy {
  public resumePage!: Type<any>;
  private jsEventBusId = 'ResumeEditorComponent';
  constructor(
    private templateModalService: TemplateModalService,
    private utilService: UtilService,
    private jsEventBusService: JSEventBusService,
    private pageManager: PageManagerService,
  ) {}

  private eventBusSubscription!: Subscription;
  private jsEventUnsubscribeArr: (() => void)[] = []
  private eventUtil = this.utilService.eventUtil;
  public modalIds: IdObj = {
    font: 'font',
    layout: 'layout',
    helper: 'helper'
  }
  private modalId: string = '';

  private layoutEditorStyles: {} = {
    'background-color': 'rgb(36, 104, 136)',
    'border-radius': '17px',
    'box-shadow': 'none',
    transform: 'translate(-50%, 2em)',
  };
  private backdropStyles = {
    backdropFilter: 'blur(0)',
  };

  ngOnInit(): void {
    this.resumePage = ResumePageComponent;
    // @ViewChild('resumePageComponent', { static: false }) resumePageComponent!: ResumePageComponent;
    this.jsEventBusService.subscribe(this.jsEventBusId, 'click', this.resumeHelper.bind(this), {
      target: 'app-p'
    })
  }

  openLayouts(e: Event,  id: string) {
    const { clientX, clientY } = this.eventUtil.eventData(e);
    const [width, height] = this.eventUtil.resizeToScreen(50, 60);
    this.layoutEditorStyles = {
      ...this.layoutEditorStyles,
      top: `${clientY}px`,
      left: `${clientX}px`,
      'width': `${width}px`,
      'height': `${height}px`,
    };
    this.modalSubscriptionHandler(id)
    this.eventBusSubscription = this.templateModalService
      .open(LayoutSelectorComponent, {
        styles: this.layoutEditorStyles,
        backdropStyles: this.backdropStyles,
        openTransmission: true
      })
      .subscribe((observable) => {
        if (observable.data && observable.data.hasOwnProperty('confirm')) {
          this.eventBusSubscription.unsubscribe();
        } else if (observable) {
          const obj = {
            layout: observable.data
          }
          this.pageManager.modifyPage(obj as unknown as GridData)
        }
      });
  }

  openFonts(e: Event, id: string) {
    const { clientX, clientY } = this.eventUtil.eventData(e);
    const [width, height] = this.eventUtil.resizeToScreen(30, 30);
    this.layoutEditorStyles = {
      ...this.layoutEditorStyles,
      top: `${clientY}px`,
      left: `${clientX}px`,
      'width': `${width}px`,
      'height': `${height}px`,
    };
    this.modalSubscriptionHandler(id)
    this.eventBusSubscription = this.templateModalService
      .open(FontSelectorComponent, {
        styles: this.layoutEditorStyles,
        backdropStyles: this.backdropStyles,
        openTransmission: true
      })
      .subscribe((observable) => {
        if (observable.data && observable.data.hasOwnProperty('confirm')) {
          this.eventBusSubscription.unsubscribe();
        } else if (observable) {
          const obj = {
            changeFont: observable.data
          }
          this.pageManager.modifyPage(obj as PageValues)
        }
      });
  }

  resumeHelper(e: Event) {
    const { clientX, clientY } = this.eventUtil.eventData(e);
    const [width, height] = this.eventUtil.resizeToScreen(3, 20);
    this.layoutEditorStyles = {
      ...this.layoutEditorStyles,
      top: `${clientY - (height / 2)}px`,
      left: `${clientX - width}px`,
      'width': `${width}px`,
      'height': `${height}px`,
      'border-radius': `${13}px`,
    };
    this.modalSubscriptionHandler(this.modalIds['helper'])
    this.eventBusSubscription = this.templateModalService
      .open(ResumeHelperComponent, {
        styles: this.layoutEditorStyles,
        backdropStyles: this.backdropStyles,
        openTransmission: true
      })
      .subscribe((observable) => {
        console.log(observable);
        if (observable.data && observable.data.hasOwnProperty('confirm')) {
          this.eventBusSubscription.unsubscribe();
        } else if (observable) {
          const obj = {
            changeFont: observable.data
          }
          this.pageManager.modifyPage(obj as PageValues)
        }
      });
  }

  modalSubscriptionHandler(id: string) {
    if (id !== this.modalId && this.eventBusSubscription) {
      this.eventBusSubscription.unsubscribe()
    }
    this.modalId = id;
  }

  resize(sign: string) {
    this.pageManager.modifyPage({resize: sign})
  }

  ngOnDestroy(): void {
    this.eventBusSubscription.unsubscribe()
  }

  print() {
    this.resumePage
  }
}
