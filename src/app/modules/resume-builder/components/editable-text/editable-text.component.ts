import { Component } from '@angular/core';

@Component({
  selector: 'app-p',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css'],
})
export class EditableTextComponent {
  public isInput = false;
  public textContent: string | null = 'Some text...';
  private inputBuffer: string | null = this.textContent;

  constructor() {}
  onInput(e: Event) {
    this.inputBuffer = (e.target as HTMLElement).innerText
  }

  onBlur() {
    this.textContent = this.inputBuffer;
  }
}
