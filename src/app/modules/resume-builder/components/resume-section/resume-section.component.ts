import { PageManagerService } from './../../page-manager.service';
import { FontGroup } from './../../types';
import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FontConfig, PageValues, Style, layoutData } from '../../types';
import { Subscription } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { DEFAULT_AVATAR } from 'src/app/constants/template';

@Component({
  selector: 'app-resume-section',
  templateUrl: './resume-section.component.html',
  styleUrls: ['./resume-section.component.css'],
})
export class ResumeSectionComponent implements OnChanges, OnInit, OnDestroy {
  @Input('gridStyles') styles: Style = {};
  @Input('data') data: layoutData | null = null;
  @Input('contentStyle') contentStyles: Style = {};
  @Input('textStyling') fontStyling: FontConfig = {};
  @HostBinding('style') sectionStyles: Style = this.styles;

  public avatar = DEFAULT_AVATAR;

  constructor(private pageManagerService: PageManagerService) {}
  public fontStyles: FontGroup = {
    sectionHeading: {
      fontSize: '18px',
      fontFamily: 'Calibri',
    },
    topicHeading: {
      fontSize: '14px',
      fontFamily: 'Calibri',
    },
    paragraph: {
      fontSize: '12px',
      fontFamily: 'Calibri',
    },
  };
  public personal: DocumentData = {};
private pageManagerSubscription!: Subscription;
  ngOnInit(): void {
    this.pageManagerSubscription = this.pageManagerService.personalData.subscribe(data => {
    this.personal = data;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['styles']) {
      this.sectionStyles = { ...this.styles };
    }
    if (changes['fontStyling']) {
      this.changeFontHandler(changes['fontStyling'].currentValue);
    }
  }

  changeFontHandler(values: PageValues) {
    let styleGoups = values as FontConfig;
    Object.keys(values).forEach((section) => {
      if (styleGoups[section]) {
        let { ...style } = styleGoups[section];
        delete style['baseSize'];
        this.fontStyles[section] = style as unknown as Style;
      }
    });
  }

  ngOnDestroy(): void {
    this.pageManagerSubscription.unsubscribe();
  }
}
