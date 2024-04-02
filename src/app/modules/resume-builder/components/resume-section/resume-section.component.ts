import { FontGroup } from './../../types';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { FontConfig, PageValues, Style, layoutData } from '../../types';

@Component({
  selector: 'app-resume-section',
  templateUrl: './resume-section.component.html',
  styleUrls: ['./resume-section.component.css'],
})
export class ResumeSectionComponent implements OnChanges {
  @Input('gridStyles') styles: Style = {};
  @Input('data') data: layoutData | null = null;
  @Input('contentStyle') contentStyles: Style = {};
  @Input('textStyling') fontStyling: FontConfig = {};
  @HostBinding('style') sectionStyles: Style = this.styles;

  constructor(){}


  public fontStyles: FontGroup = {
    "sectionHeading": {
        "fontSize": "18px",
        "fontFamily": "Calibri"
    },
    "topicHeading": {
        "fontSize": "14px",
        "fontFamily": "Calibri"
    },
    "paragraph": {
        "fontSize": "12px",
        "fontFamily": "Calibri"
    }
};


  ngOnChanges(changes: SimpleChanges) {
    if (changes['styles']) {
      this.sectionStyles = { ...this.styles };
    }
    if (changes['fontStyling']) {
      this.changeFontHandler(changes['fontStyling'].currentValue);
    }
  }

  changeFontHandler(values: PageValues) {
    let styleGoups = values as FontConfig
    Object.keys(values).forEach((section) => {
      if (styleGoups[section]) {
        let { ...style } = styleGoups[section];
        delete style['baseSize'];
          this.fontStyles[section] = style as unknown as Style
      }
    });
  }
}
