import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Style } from '../../types';

@Component({
  selector: 'app-resume-section',
  templateUrl: './resume-section.component.html',
  styleUrls: ['./resume-section.component.css'],
})
export class ResumeSectionComponent implements OnChanges {
  @Input('gridStyles')styles: Style = {}
  @HostBinding('style') sectionStyles: Style = this.styles

  public test = [
    {id:'title', type: 'text', content: 'Hi This is my title', styles: {}},
    {id:'date', type: 'date', content: '01/12/2023', styles: {}},
    {id:'text', type: 'text', content: 'Random Text...', styles: {
      color: 'blue',
      fontSize: '23px',
      fontWeight: 'bold',
      textShadow: '2px 0 2px black'
    }},
  ]

  ngOnChanges(changes: SimpleChanges) {
    if (changes['styles']) {
      this.sectionStyles = { ...this.styles }; // Update sectionStyles when styles input changes
      console.log(changes);

    }
  }

  textEdit(text: string, id: string) {
    // Handle the event object here
    const index = this.test.findIndex(el => el.id === id);
    this.test[index].content = text
    console.log(this.test[index]);
  }

}
