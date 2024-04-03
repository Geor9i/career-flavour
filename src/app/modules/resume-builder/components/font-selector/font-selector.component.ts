import { PageManagerService } from './../../page-manager.service';
import { resumeConstants } from './../../../../constants/resume-constants';
import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/modules/event-bus/event-bus.service';
import { UtilService } from 'src/app/modules/utils/util.service';
import { FONT_APPLICATORS, FONT_SETTINGS } from 'src/app/constants/fontConstants';
import { DocumentData } from '@angular/fire/firestore';
@Component({
  selector: 'app-font-selector',
  templateUrl: './font-selector.component.html',
  styleUrls: ['./font-selector.component.css'],
})
export class FontSelectorComponent implements OnInit {
  constructor(
    private utilService: UtilService,
    private eventBusService: EventBusService,
    private pageManagerService: PageManagerService
  ) {}
  public stringUtil = this.utilService.stringUtil;
  private domUtil = this.utilService.domUtil;
  public fonts = [...resumeConstants.FONTS];
  public selectedFont = 'Calibri';
  public Object = Object;
  public fontSize = '0';
  public fontApplicators = FONT_APPLICATORS;
  private fontSettings: DocumentData = {};


  ngOnInit(): void {
    this.pageManagerService.resumeData.subscribe(data => {
      if (data && data['textStyles']) {
        const styles = data['textStyles'];
        Object.keys(styles).forEach(key => {
          const baseValue = this.domUtil.getUnitValue(styles[key]['baseSize'], true);
          const curentValue = this.domUtil.getUnitValue(styles[key]['fontSize'], true);
          this.fontSettings[key] = {
            ...styles[key],
            fontIncrement: Number(curentValue) - Number(baseValue)
          }
        })
      }
    })
  }

  transmit() {
    const activeApplicators = Object.keys(this.fontApplicators).filter(
      (key) => this.fontApplicators[key]['checked']
    );
    this.eventBusService.emit({
      event: 'TemplateModalContentOutput',
      data: {
        fontSize: this.fontSize,
        applicators: activeApplicators,
        font: this.selectedFont
       }
    });
  }

  switchApply(e: Event) {
    const target = e.target as HTMLInputElement;
    const applicators = this.fontApplicators;
    const { id } = target;
    if (id === applicators['all']['id'] && target.checked) {
      Object.keys(applicators).forEach((key) => {
        applicators[key]['checked'] =
          applicators[key]['id'] === this.fontApplicators['all']['id'];
      });
    } else {
      applicators['all']['checked'] = false;
      if (this.fontSettings) {
        Object.keys(applicators).forEach(applicator => {
          if (applicators[applicator]['checked']) {
            this.selectedFont = this.fontSettings[applicator]['fontFamily'];
            this.fontSize = this.fontSettings[applicator]['fontIncrement']
          }
        })
      }

    }
  }

  changeFontSize(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    this.transmit();
  }
}
