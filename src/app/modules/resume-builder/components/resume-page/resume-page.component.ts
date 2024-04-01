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
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  CellRatios,
  FontConfig,
  GridData,
  PageValues,
  layoutData,
} from '../../types';
import { Subscription } from 'rxjs';
import { JSEvent } from 'src/app/modules/event-bus/types';

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
    private elRef: ElementRef
  ) {}
  private pageManagerSubscription!: Subscription;
  private jsEventBusSubscribtionArr: (() => void)[] = [];
  @ViewChild('sheet') sheet!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  private dragOffsetX = 0;
  private dragOffsetY = 0;
  private cellRatios: CellRatios = {
    rows : [],
    columns : [],
  }
  private eventUtil = this.utilService.eventUtil;
  private domUtil = this.utilService.domUtil;
  private eventId = 'ResumePageComponent';
  public pageClick = false;
  private isDraggin = false;
  private resumeBuilderUtil = this.utilService.resumeBuilderUtil;
  public resumeConstants = resumeConstants;
  public selectedOption: Event | string = '';
  resumeStyles = INITIAL_STYLES;
  public textStyling: FontConfig = FONT_SETTINGS;
  public sections: any[] = [
    {
        "type": "Header",
        "name": "Test name",
        "position": "Applying for...",
        "summary": "Something about me...",
        "contentPlacement": "list",
        "contentFlow": "vertical",
        "styles": {
            "gridRowStart": "auto",
            "gridColumnEnd": "3",
            "gridRowEnd": "auto",
            "gridColumnStart": "1"
        }
    },
    {
        "type": "Education",
        "title": "Education",
        "contentPlacement": "chronological",
        "contentFlow": "vertical",
        "styles": {
            "gridRowStart": "auto",
            "gridColumnEnd": "auto",
            "gridRowEnd": "auto",
            "gridColumnStart": "auto"
        }
    },
    {
        "type": "Work Experience",
        "title": "Work Experience",
        "contentPlacement": "chronological",
        "contentFlow": "horizontal",
        "styles": {
            "gridRowStart": "auto",
            "gridColumnEnd": "auto",
            "gridRowEnd": "auto",
            "gridColumnStart": "auto"
        }
    },
    {
        "type": "Soft Skills",
        "title": "Soft Skills",
        "contentPlacement": "list",
        "contentFlow": "horizontal",
        "styles": {
            "gridRowStart": "auto",
            "gridColumnEnd": "auto",
            "gridRowEnd": "auto",
            "gridColumnStart": "auto"
        }
    },
    {
        "type": "Skills",
        "title": "Skills",
        "contentPlacement": "list",
        "contentFlow": "vertical",
        "styles": {
            "gridRowStart": "auto",
            "gridColumnEnd": "auto",
            "gridRowEnd": "auto",
            "gridColumnStart": "auto"
        }
    },
    {
        "type": "Contacts",
        "styles": {
            "gridRowStart": "auto",
            "gridColumnEnd": "auto",
            "gridRowEnd": "auto",
            "gridColumnStart": "auto"
        }
    },
    {
        "type": "Hobbies",
        "styles": {
            "gridRowStart": "auto",
            "gridColumnEnd": "auto",
            "gridRowEnd": "auto",
            "gridColumnStart": "auto"
        }
    },
    {
        "type": "Projects",
        "styles": {
            "gridRowStart": "auto",
            "gridColumnEnd": "auto",
            "gridRowEnd": "auto",
            "gridColumnStart": "auto"
        }
    },
    {
        "type": "Certificates",
        "styles": {
            "gridRowStart": "auto",
            "gridColumnEnd": "auto",
            "gridRowEnd": "auto",
            "gridColumnStart": "auto"
        }
    }
];

  ngOnInit(): void {
    this.renderer.setStyle(
      document.documentElement,
      'background-color',
      '#444457'
    );
    this.pageManagerSubscription = this.pageManager.messenger$.subscribe(
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
      this.dragEnd.bind(this),
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
    const {clientX, clientY} = e;
    const { rect } =  this.eventUtil.elementData(this.sheet.nativeElement);
    this.dragOffsetX = clientX - rect.left;
    this.dragOffsetY = clientY - rect.top;

  }

  dragOver(event: JSEvent) {
    if (this.isDraggin) {
      console.log('drag');
      let e = event as MouseEvent;
      const { clientX, clientY } = this.eventUtil.eventData(e);
      this.resumeStyles['left'] = clientX - this.dragOffsetX + 'px';
      this.resumeStyles['top'] = clientY - this.dragOffsetY  + 'px';
    }
  }

  dragEnd(e: JSEvent) {
    this.isDraggin = false;
  }

  ngOnDestroy(): void {
    this.pageManagerSubscription.unsubscribe();
    this.renderer.removeStyle(document.documentElement, 'background-color');
  }

  delegateTask(values: PageValues) {
    const delegator: { [key: string]: () => void } = {
      resize: () => this.resizePage(values.resize as string),
      changeFont: () => this.processTextStyling(values),
      layout: () => this.editLayout(values as GridData),
    };

    Object.keys(values).forEach((action) => {
      delegator[action]();
    });
  }

  editLayout(data: GridData) {
    const { gridTemplateColumns, gridTemplateRows, childData } = data[
      'layout'
    ] as layoutData;

    this.cellRatios.columns = this.domUtil.getRawGridValue(gridTemplateColumns as string).map(Number);
    this.cellRatios.rows = this.domUtil.getRawGridValue(gridTemplateRows as string).map(Number);
    const sheetWidth = Number(this.domUtil.getUnitValue(this.resumeStyles['width'] as string, true));
    const sheetHeight = Number(this.domUtil.getUnitValue(this.resumeStyles['height'] as string, true));
    const padding = Number(this.domUtil.getUnitValue(this.resumeStyles['padding'] as string, true));
    const { rows, colums } = this.calcGridCells(sheetWidth, sheetHeight, padding);
    this.resumeStyles = {
      ...this.resumeStyles,
      gridTemplateColumns: colums,
      gridTemplateRows: rows,
    };
    this.sections = childData as unknown as layoutData[];
    // console.log(this.resumeStyles);
    // console.log(this.sections);

  }

  calcGridCells(sheetWidth: number, sheetHeight: number, padding?: number) {
    let paddingSize = (padding ?? 0) * 2;
    let colums = this.cellRatios.columns.map(col => ((sheetWidth - paddingSize) * (col / 100)) + 'px').join(' ');
    let rows = this.cellRatios.rows.map(row => ((sheetHeight - paddingSize) * (row / 100)) + 'px').join(' ');
    return {rows, colums}
  }

  processTextStyling(values: PageValues) {
    console.log(values);
  }

  resizePage(size: string) {
    let { width, height, unit } = this.resumeBuilderUtil.calcAspectRatio(
      size,
      this.resumeStyles,
      'px'
    );
    let fontSize = this.resumeBuilderUtil.fontRatio(width);
    this.resumeStyles['width'] = width + unit;
    this.resumeStyles['height'] = height + unit;
    this.resumeStyles['fontSize'] = fontSize + unit;
    if (this.resumeStyles['gridTemplateColumns'] && this.resumeStyles['gridTemplateRows']) {
      const padding = Number(this.domUtil.getUnitValue(this.resumeStyles['padding'] as string, true));
      const { rows, colums } = this.calcGridCells(width, height, padding);
      this.resumeStyles['gridTemplateRows'] = rows;
      this.resumeStyles['gridTemplateColumns'] = colums;
    }
  }
}
