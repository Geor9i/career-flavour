import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-p',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css'],
})
export class EditableTextComponent {
  @ViewChild('editableP') editableP!: ElementRef;
  public isInput = false;
  public text = 'Ldddddddddddddd';
  private inputBuffer = '';

  constructor() {}
  onInput() {
    this.inputBuffer = this.extractTextContent(this.editableP.nativeElement);
  }

  private extractTextContent(element: HTMLElement): string {
    let textContent = '';

    // Traverse child nodes
    for (let node of Array.from(element.childNodes)) {
      if (node.nodeType === Node.TEXT_NODE) {
        // If it's a text node, append its text content
        textContent += node.textContent ?? '';
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // If it's an element node, recursively extract text content from its descendants
        textContent += this.extractTextContent(node as HTMLElement);
      }
    }

    return textContent;
  }

  onBlur() {
    this.text = this.inputBuffer;
    this.inputBuffer = '';
    console.log(this.text);

  }
}
