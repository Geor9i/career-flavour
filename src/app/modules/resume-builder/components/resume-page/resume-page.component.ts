import { resumeConstants } from './../../../../constants/resume-constants';
import { UtilService } from './../../../utils/util.service';
import { PageManagerService } from './../../page-manager.service';
import { Component, OnInit } from '@angular/core';
import { PageValues } from '../../types';

@Component({
  selector: 'app-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.css'],
})
export class ResumePageComponent implements OnInit {
  constructor(
    private pageManager: PageManagerService,
    private utilService: UtilService
  ) {}
  private resumeBuilderUtil = this.utilService.resumeBuilderUtil;
  public resumeConstants = resumeConstants;
  public selectedOption: Event | string = '';
  resumeStyles = {
    width: '595px',
    height: '842px',
    backgroundColor: 'lightgray',
    color: 'black',
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px',
    padding: '2em',
    borderRadius: '5px',
  };

  ngOnInit(): void {
    this.pageManager.messenger$.subscribe((data) => {
      this.delegateTask(data);
    });
  }

  change(value: PageValues) {
    this.pageManager.modifyPage(value);
  }

  delegateTask(values: PageValues) {
    const delegator: { [key: string]: () => void } = {
      resize: () => this.resizePage(values.resize as string),
      changeFont: () => this.resumeStyles.fontFamily = (values.changeFont as string),
    };


    Object.keys(values).forEach((action) => {
      delegator[action]();
    });
  }

  resizePage(size: string) {
    let { width, height, unit} = this.resumeBuilderUtil.aspectRatio(size, this.resumeStyles);
    let fontSize = this.resumeBuilderUtil.fontRatio(width);
    this.resumeStyles.width = width + unit;
    this.resumeStyles.height = height + unit;
    this.resumeStyles.fontSize = fontSize + unit;
  }

  changeFont() {
    this.pageManager.modifyPage({changeFont: this.selectedOption as string})
  }
}
