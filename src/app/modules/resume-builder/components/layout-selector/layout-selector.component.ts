import { layoutConstants } from 'src/app/constants/layoutConstants';
import { JSEventBusService } from './../../../event-bus/jsevent-bus.service';
import { UtilService } from './../../../utils/util.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-layout-selector',
  templateUrl: './layout-selector.component.html',
  styleUrls: ['./layout-selector.component.css'],
})
export class LayoutSelectorComponent implements AfterViewInit {
  @ViewChild('sheetWrapper') sheetWrapper!: ElementRef;
  @ViewChild('sheet') sheet!: ElementRef;
  constructor(
    private utilService: UtilService,
    private jsEventBusService: JSEventBusService
  ) {}
  private stringUtil = this.utilService.stringUtil;
  private resumeUtil = this.utilService.resumeBuilderUtil;
  private eventId = 'LayoutSelectorComponent';
  private jsEventUnsubscribeArr: (() => void)[] = [];
  public generalSections = layoutConstants.generalSections;
  sheetStyles = {
    width: '0',
    height: '0',
  };

  ngAfterViewInit(): void {
    this.setSheetDimensions();
  }

  addSection(form: NgForm) {
    let { name } = form.value;
    if (!name) return
    name = this.stringUtil.format(name);
    name = this.stringUtil.toPascalCase(name);
    this.generalSections.push(name)
    form.reset();
  }

  setSheetDimensions() {
    const { height: wrapperHeight } =
      this.sheetWrapper.nativeElement.getBoundingClientRect();
    let adjustdheight = wrapperHeight * 0.8;
    const { width, height } = this.resumeUtil.aspectRatio({
      height: adjustdheight,
    });
    this.sheetStyles = {
      ...this.sheetStyles,
      width: width + 'px',
      height: height + 'px',
    };
  }
}
