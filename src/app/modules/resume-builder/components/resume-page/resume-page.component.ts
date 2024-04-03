import { FireService } from 'src/app/modules/fire/fire-service';
import { FONT_APPLICATORS } from 'src/app/constants/fontConstants';
import { FONT_SETTINGS } from './../../../../constants/fontConstants';
import { JSEventBusService } from './../../../event-bus/jsevent-bus.service';
import {
  resumeConstants,
  INITIAL_STYLES,
} from './../../../../constants/resume-constants';
import { UtilService } from './../../../utils/util.service';
import { PageManagerService } from './../../page-manager.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  CellRatios,
  FontConfig,
  FontStyling,
  GridData,
  PageValues,
  layoutData,
} from '../../types';
import { Subscription } from 'rxjs';
import { JSEvent } from 'src/app/modules/event-bus/types';
import { DocumentData } from '@angular/fire/firestore';
import { RESUME_DB } from 'src/app/constants/dbConstants';

@Component({
  selector: 'app-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.css'],
})
export class ResumePageComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private jsEventBusService: JSEventBusService,
    private pageManager: PageManagerService,
    private utilService: UtilService,
    private renderer: Renderer2,
    private fireService: FireService
  ) {}
  private pageManagerResumeDataSubscription!: Subscription;
  private pageManagerModalSubscription!: Subscription;
  private jsEventBusSubscribtionArr: (() => void)[] = [];
  @ViewChild('sheet') sheet!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @Input('resumeData') resumeData!: DocumentData;

  private dragOffsetX = 0;
  private dragOffsetY = 0;
  private cellRatios: CellRatios = {
    rows: [],
    columns: [],
  };
  private objectUtil = this.utilService.objectUtil;
  private eventUtil = this.utilService.eventUtil;
  private domUtil = this.utilService.domUtil;
  private zoom = 1;
  private eventId = 'ResumePageComponent';
  public pageClick = false;
  private isDraggin = false;
  private resumeBuilderUtil = this.utilService.resumeBuilderUtil;
  public resumeConstants = resumeConstants;
  public selectedOption: Event | string = '';
  resumeStyles = INITIAL_STYLES;
  public textStyling: FontConfig = FONT_SETTINGS;
  public sections: any[] = [];
  private userDataSubscription!: Subscription;
  private initialiseData = false;

  ngOnInit(): void {
    this.pageManagerResumeDataSubscription =
      this.pageManager.resumeData.subscribe((data) => {
        // console.log('data: ', data);

        const layout = data?.['layout'] || {};
        const { sections, gridTemplateRows, gridTemplateColumns } = layout;
        if (sections && gridTemplateColumns && gridTemplateRows) {
          this.initialiseData = true;
          this.sections = this.objectUtil.reduceToArr(sections, {
            orderData: true,
          });
          // console.log('this.sections: ', this.sections);

          this.editSaveLayout({
            sections: this.sections,
            gridTemplateRows,
            gridTemplateColumns,
          });
          this.initialiseData = false;
        }
      });

    this.renderer.setStyle(
      document.documentElement,
      'background-color',
      '#444457'
    );
    this.pageManagerModalSubscription = this.pageManager.messenger$.subscribe(
      (data) => {
        this.delegateTask(data);
      }
    );
  }

  ngAfterViewInit(): void {
    const unsubscribe1 = this.jsEventBusService.subscribe(
      this.eventId,
      'mousedown',
      this.dragStart.bind(this),
      { target: this.sheet.nativeElement }
    );
    const unsubscribe2 = this.jsEventBusService.subscribe(
      this.eventId,
      'mousemove',
      this.dragOver.bind(this),
      { target: this.container.nativeElement }
    );
    const unsubscribe3 = this.jsEventBusService.subscribe(
      this.eventId,
      'mouseup',
      this.dragEnd.bind(this)
    );
    this.jsEventBusSubscribtionArr.push(
      unsubscribe1,
      unsubscribe2,
      unsubscribe3
    );
  }

  dragStart(event: JSEvent) {
    const e = event as MouseEvent;
    if (e.target !== this.sheet.nativeElement) return;

    this.isDraggin = true;
    const { clientX, clientY } = e;
    const { rect } = this.eventUtil.elementData(this.sheet.nativeElement);
    this.dragOffsetX = clientX - rect.left;
    this.dragOffsetY = clientY - rect.top;
  }

  dragOver(event: JSEvent) {
    if (this.isDraggin) {
      let e = event as MouseEvent;
      const { clientX, clientY } = this.eventUtil.eventData(e);
      this.resumeStyles['left'] = clientX - this.dragOffsetX + 'px';
      this.resumeStyles['top'] = clientY - this.dragOffsetY + 'px';
    }
  }

  dragEnd(e: JSEvent) {
    this.isDraggin = false;
  }

  ngOnDestroy(): void {
    this.pageManager.resumeData = {};
    this.pageManagerResumeDataSubscription.unsubscribe();
    this.pageManagerModalSubscription.unsubscribe();
    this.renderer.removeStyle(document.documentElement, 'background-color');
  }

  delegateTask(values: PageValues) {
    const delegator: { [key: string]: () => void } = {
      resize: () => this.resizePage(values.resize as string),
      changeFont: () => this.processTextStyling(values),
      layout: () => this.editSaveLayout(values['layout'] as GridData),
    };

    Object.keys(values).forEach((action) => {
      delegator[action]();
    });
  }

  editSaveLayout(data: GridData) {
    const { gridTemplateColumns, gridTemplateRows, sections } = data;
    this.cellRatios.columns = this.domUtil
      .getRawGridValue(gridTemplateColumns as string)
      .map(Number);
    this.cellRatios.rows = this.domUtil
      .getRawGridValue(gridTemplateRows as string)
      .map(Number);
    const sheetWidth = Number(
      this.domUtil.getUnitValue(this.resumeStyles['width'] as string, true)
    );
    const sheetHeight = Number(
      this.domUtil.getUnitValue(this.resumeStyles['height'] as string, true)
    );
    const padding = Number(
      this.domUtil.getUnitValue(this.resumeStyles['padding'] as string, true)
    );
    const { rows, colums } = this.calcGridCells(
      sheetWidth,
      sheetHeight,
      padding
    );
    this.resumeStyles = {
      ...this.resumeStyles,
      gridTemplateColumns: colums,
      gridTemplateRows: rows,
    };
    this.sections = sections as unknown as layoutData[];
    let sectionsObj = this.objectUtil.reduceToObj(this.sections, 'type');

    const resumeId = this.pageManager.resumeID;
    const layoutData = {
      sections: sectionsObj,
      gridTemplateColumns,
      gridTemplateRows,
    };
    if (!this.initialiseData) {
      const dbPath = `resumes.${resumeId}.layout`;
      console.log(dbPath);

      this.fireService.saveToDB(layoutData, dbPath).subscribe(() => {});
    }
  }

  calcGridCells(sheetWidth: number, sheetHeight: number, padding?: number) {
    let paddingSize = (padding ?? 0) * 2;
    let colums = this.cellRatios.columns
      .map((col) => (sheetWidth - paddingSize) * (col / 100) + 'px')
      .join(' ');
    let rows = this.cellRatios.rows
      .map((row) => (sheetHeight - paddingSize) * (row / 100) + 'px')
      .join(' ');
    return { rows, colums };
  }

  processTextStyling(values: PageValues) {
    const { applicators, font, fontSize } = values.changeFont as FontStyling;
    if (this.textStyling) {
      Object.keys(this.textStyling).forEach((selector) => {
        if (
          applicators?.includes(FONT_APPLICATORS['all']['id']) ||
          applicators?.includes(FONT_APPLICATORS[selector]['id'])
        ) {
          const fontObj = this.textStyling[selector];
          if (fontObj) {
            const baseSize = fontObj['baseSize'] ?? '12px';
            let numBaseSize = this.domUtil.getUnitValue(baseSize, true);
            (this.textStyling[selector] as FontStyling)['fontSize'] = `${
              Number(numBaseSize) + Number(fontSize)
            }px`;
            (this.textStyling[selector] as FontStyling)['fontFamily'] =
              font as string;
            }
          }
        });
    }
    this.textStyling = { ...this.textStyling };
    const resumeId = this.pageManager.resumeID;
    const dbPath = `resumes.${resumeId}.textStyles`;
    this.fireService.saveToDB(this.textStyling, dbPath).subscribe(() => {})
  }

  resizePage(size: string) {
    const sign = size === '+' ? 1 : -1;
    this.zoom = Math.min(Math.max(0.5, this.zoom + 0.1 * sign), 3);
    this.resumeStyles['transform'] = `scale(${this.zoom})`;
    console.log(this.resumeStyles);
  }
}
