import { JSEventBusService } from './../../../event-bus/jsevent-bus.service';
import { resumeConstants, INITIAL_STYLES } from './../../../../constants/resume-constants';
import { UtilService } from './../../../utils/util.service';
import { PageManagerService } from './../../page-manager.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { GridData, PageValues, Style, layoutData } from '../../types';
import { JSEvent } from 'src/app/modules/event-bus/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.css'],
})
export class ResumePageComponent implements OnInit, OnDestroy {
  constructor(
    private jsEventBusService: JSEventBusService,
    private pageManager: PageManagerService,
    private utilService: UtilService,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}
  private pageManagerSubscription!: Subscription;
  @ViewChild('sheet') sheet!: ElementRef;
  private eventId = 'ResumePageComponent';
  public pageClick = false;
  private resumeBuilderUtil = this.utilService.resumeBuilderUtil;
  public resumeConstants = resumeConstants;
  public selectedOption: Event | string = '';
  public sections: any[]= [];
  resumeStyles = INITIAL_STYLES;
  public sectionStyles: Style = {
    gridRowStart: '0',
    gridRowEnd: '0',
    gridColumnStart: '1',
    gridColumnEnd: '2',
  };
  public sectionStyles1: Style = {
    gridRowStart: '0',
    gridRowEnd: '0',
    gridColumnStart: '2',
    gridColumnEnd: '3',
  };

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

  ngOnDestroy(): void {
    this.pageManagerSubscription.unsubscribe();
    this.renderer.removeStyle(document.documentElement, 'background-color');
  }

  change(value: PageValues) {
    this.pageManager.modifyPage(value);
  }

  delegateTask(values: PageValues) {
    const delegator: { [key: string]: () => void } = {
      resize: () => this.resizePage(values.resize as string),
      changeFont: () =>
        (this.resumeStyles['fontFamily'] = values.changeFont as string),
      layout: () => this.editLayout(values as GridData),
    };

    Object.keys(values).forEach((action) => {
      delegator[action]();
    });
  }

  editLayout(data: GridData) {
    const { gridTemplateColumns, gridTemplateRows, childData } = data['layout'] as layoutData;
    this.resumeStyles = {
      ...this.resumeStyles,
      gridTemplateColumns : (gridTemplateColumns as string),
      gridTemlateRows: (gridTemplateRows as string),
    }
    this.sections = childData as unknown as layoutData[];
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
  }

  changeFont() {
    this.pageManager.modifyPage({ changeFont: this.selectedOption as string });
  }
}
