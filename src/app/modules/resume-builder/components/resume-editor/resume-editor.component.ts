import { FireService } from 'src/app/modules/fire/fire-service';
import { IdObj, PageValues } from './../../types';
import { JSEventBusService } from 'src/app/modules/event-bus/jsevent-bus.service';
import { UtilService } from './../../../utils/util.service';
import { TemplateModalService } from './../../../shared/templateModal/templateModal.service';
import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { LayoutSelectorComponent } from '../layout-selector/layout-selector.component';
import { Subscription } from 'rxjs';
import { PageManagerService } from '../../page-manager.service';
import { GridData } from '../../types';
import { FontSelectorComponent } from '../font-selector/font-selector.component';
import { ResumeHelperComponent } from '../resume-helper/resume-helper.component';
import { ResumeDocumentsComponent } from '../resume-documents/resume-documents.component';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from '@angular/fire/firestore';
import { RESUME_DB } from 'src/app/constants/dbConstants';

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
    private activatedRoute: ActivatedRoute,
    private fireService: FireService
  ) {}
  private fireServiceSubscribtion!: Subscription;
  private resumeData!: DocumentData;
  private eventBusSubscription!: Subscription;
  private jsEventUnsubscribeArr: (() => void)[] = [];
  private eventUtil = this.utilService.eventUtil;
  public modalIds: IdObj = {
    font: 'font',
    layout: 'layout',
    helper: 'helper',
    documents: 'documents',
  };
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

    this.fireServiceSubscribtion = this.fireService.userData.subscribe(data => {
      const documentId = this.activatedRoute.snapshot.params['id'];
      this.pageManager.resumeID = documentId;
      if (data && data?.[RESUME_DB.RESUMES]?.[documentId]) {
          const resumeData = data?.[RESUME_DB.RESUMES]?.[documentId];
          this.pageManager.resumeData = resumeData;
      }
    })


    const unsubscribe = this.jsEventBusService.subscribe(
      this.jsEventBusId,
      'click',
      this.resumeHelper.bind(this),
      {
        target: 'app-p',
      }
    );
    this.jsEventUnsubscribeArr.push(unsubscribe)
  }

  openLayouts(e: Event, id: string) {
    const { clientX, clientY } = this.eventUtil.eventData(e);
    const [width, height] = this.eventUtil.resizeToScreen(50, 60);
    this.layoutEditorStyles = {
      ...this.layoutEditorStyles,
      top: `${clientY}px`,
      left: `${clientX}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
    this.modalSubscriptionHandler(id);
    this.eventBusSubscription = this.templateModalService
      .open(LayoutSelectorComponent, {
        styles: this.layoutEditorStyles,
        backdropStyles: this.backdropStyles,
        openTransmission: true,
      })
      .subscribe((observable) => {
        if (observable.data && observable.data.hasOwnProperty('confirm')) {
          this.eventBusSubscription.unsubscribe();
        } else if (observable) {
          const obj = {
            layout: observable.data,
          };
          this.pageManager.modifyPage(obj as unknown as GridData);
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
      width: `${width}px`,
      height: `${height}px`,
    };
    this.modalSubscriptionHandler(id);
    this.eventBusSubscription = this.templateModalService
      .open(FontSelectorComponent, {
        styles: this.layoutEditorStyles,
        backdropStyles: this.backdropStyles,
        openTransmission: true,
      })
      .subscribe((observable) => {
        if (observable.data && observable.data.hasOwnProperty('confirm')) {
          this.eventBusSubscription.unsubscribe();
        } else if (observable) {
          const obj = {
            changeFont: observable.data,
          };
          this.pageManager.modifyPage(obj as PageValues);
        }
      });
  }

  resumeHelper(e: Event) {
    const { clientX, clientY } = this.eventUtil.eventData(e);
    const [width, height] = this.eventUtil.resizeToScreen(3, 20);
    this.layoutEditorStyles = {
      ...this.layoutEditorStyles,
      top: `${clientY - height / 2}px`,
      left: `${clientX - width}px`,
      width: `${width}px`,
      height: `${height}px`,
      'border-radius': `${13}px`,
    };
    this.modalSubscriptionHandler(this.modalIds['helper']);
    this.eventBusSubscription = this.templateModalService
      .open(ResumeHelperComponent, {
        styles: this.layoutEditorStyles,
        backdropStyles: this.backdropStyles,
        openTransmission: true,
      })
      .subscribe((observable) => {
        console.log(observable);
        if (observable.data && observable.data.hasOwnProperty('confirm')) {
          this.eventBusSubscription.unsubscribe();
        } else if (observable) {
          const obj = {
            changeFont: observable.data,
          };
          this.pageManager.modifyPage(obj as PageValues);
        }
      });
  }

  openDocuments(e: Event, id: string) {
    const { clientX, clientY } = this.eventUtil.eventData(e);
    const [width, height] = this.eventUtil.resizeToScreen(40, 50);
    this.layoutEditorStyles = {
      ...this.layoutEditorStyles,
      top: `${clientY - (height / 2)}px`,
      left: `${clientX + (width * 0.75)}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
    this.modalSubscriptionHandler(id);
    this.eventBusSubscription = this.templateModalService
      .open(ResumeDocumentsComponent, {
        styles: this.layoutEditorStyles,
        backdropStyles: this.backdropStyles,
        openTransmission: true,
      })
      .subscribe((observable) => {
        if (observable.data && observable.data.hasOwnProperty('confirm')) {
          this.eventBusSubscription.unsubscribe();
        } else if (observable) {
          const obj = {
            changeFont: observable.data,
          };
          this.pageManager.modifyPage(obj as PageValues);
        }
      });
  }

  modalSubscriptionHandler(id: string) {
    if (id !== this.modalId && this.eventBusSubscription) {
      this.eventBusSubscription.unsubscribe();
    }
    this.modalId = id;
  }

  resize(sign: string) {
    this.pageManager.modifyPage({ resize: sign });
  }

  ngOnDestroy(): void {
    this.fireServiceSubscribtion.unsubscribe();
    if (this.eventBusSubscription) {
      this.eventBusSubscription.unsubscribe();
    }
    this.jsEventUnsubscribeArr.forEach(unsubscribe => unsubscribe());
  }
   print() {
    window.print()
    }

}
