import { resumeConstants } from 'src/app/constants/resume-constants';
import { UtilService } from './../../../utils/util.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout-selector',
  templateUrl: './layout-selector.component.html',
  styleUrls: ['./layout-selector.component.css'],
})
export class LayoutSelectorComponent implements AfterViewInit {
  @ViewChild('sheetWrapper') sheetWrapper!: ElementRef;
  @ViewChild('sheet') sheet!: ElementRef;
  constructor(private utilService: UtilService) {}
  private resumeUtil = this.utilService.resumeBuilderUtil;
  sheetStyles = {
    width: '0',
    height: '0',
  };

  ngAfterViewInit(): void {
    this.setSheetDimensions();
  }

  setSheetDimensions() {
    const { height: wrapperHeight } =
      this.sheetWrapper.nativeElement.getBoundingClientRect();
    let adjustdheight = wrapperHeight * 0.8;
    const { width, height } = this.resumeUtil.aspectRatio({
      height: adjustdheight,
    });
    this.sheetStyles = {
      width: width + 'px',
      height: height + 'px',
    }

  }
}
