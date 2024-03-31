import { resumeConstants } from './../../../../constants/resume-constants';
import { Component } from '@angular/core';
import { EventBusService } from 'src/app/modules/event-bus/event-bus.service';
import { UtilService } from 'src/app/modules/utils/util.service';
import { FONT_APPLICATORS } from 'src/app/constants/fontConstants';
@Component({
  selector: 'app-font-selector',
  templateUrl: './font-selector.component.html',
  styleUrls: ['./font-selector.component.css'],
})
export class FontSelectorComponent {
  constructor(
    private utilService: UtilService,
    private eventBusService: EventBusService
  ) {}
  public stringUtil = this.utilService.stringUtil;
  public fonts = [...resumeConstants.FONTS];
  public selectedFont = 'Calibri';
  public Object = Object;
  public fontSize = '0';
  public fontApplicators = FONT_APPLICATORS;

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
    }
  }

  changeFontSize(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    console.log(target.value);
    this.transmit();
  }
}
