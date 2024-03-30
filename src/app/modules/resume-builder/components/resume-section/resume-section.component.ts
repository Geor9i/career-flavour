import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Style, layoutData } from '../../types';

@Component({
  selector: 'app-resume-section',
  templateUrl: './resume-section.component.html',
  styleUrls: ['./resume-section.component.css'],
})
export class ResumeSectionComponent implements OnChanges {
  @Input('gridStyles')styles: Style = {}
  @Input('data')data: layoutData | null = null;
  @Input('contentStyle') contentStyles: Style = {};
  @Input('textStyles') textStyles: Style = {};
  @HostBinding('style') sectionStyles: Style = this.styles

  ngOnChanges(changes: SimpleChanges) {
    if (changes['styles']) {
      this.sectionStyles = { ...this.styles }; // Update sectionStyles when styles input changes
      console.log(this.styles);

    }
  }

  textEdit(text: string, id: string) {
    // Handle the event object here
    // const index = this.test.findIndex(el => el.id === id);
    // this.test[index].content = text
    // console.log(this.test[index]);
  }

}
