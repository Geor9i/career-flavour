import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FontConfig, PageValues, Style, StylesGroup, layoutData } from '../../types';
import { FONT_APPLICATORS } from 'src/app/constants/fontConstants';

@Component({
  selector: 'app-resume-section',
  templateUrl: './resume-section.component.html',
  styleUrls: ['./resume-section.component.css'],
})
export class ResumeSectionComponent implements OnChanges {
  @Input('gridStyles') styles: Style = {};
  @Input('data') data: layoutData | null = null;
  @Input('contentStyle') contentStyles: Style = {};
  @Input('textStyling') textStyling: FontConfig = {};
  @HostBinding('style') sectionStyles: Style = this.styles;
  public textStyles: StylesGroup = {
    sectionHeading: {},
    topicHeading: {},
    paragraph: {},
  };

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.data);

    if (changes['styles']) {
      this.sectionStyles = { ...this.styles }; // Update sectionStyles when styles input changes
    }
    if (changes['textStyling']) {
      this.changeFontHandler(changes['textStyling'].currentValue);
    }
  }

  changeFontHandler(values: PageValues) {
    if (values.changeFont) {

    }
  }
}
