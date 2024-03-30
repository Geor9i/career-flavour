import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Style } from '../../types';
import { INITIAL_STYLES } from 'src/app/constants/resume-constants';

@Component({
  selector: 'app-p',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css'],
})
export class EditableTextComponent implements OnChanges, AfterViewInit {
  @Output('textChanged') textChanged: EventEmitter<string> =
    new EventEmitter<string>();
  @Input('text') text: any = '';
  @Input('size') size: string = INITIAL_STYLES['fontSize'] || '';
  @Input('textStyles') styles: Style = {};
  public isInput = false;
  public textContent: string | null = this.text;
  private inputBuffer: string | null = this.textContent;

  constructor() {}

  ngAfterViewInit(): void {
    this.textContent, this.inputBuffer = this.text;
    this.styles = {
      ...this.styles,
      fontSize: this.size
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.textContent = this.text;
  }

  onInput(e: Event) {
    this.inputBuffer = (e.target as HTMLElement).innerText;
  }

  onBlur() {
    this.textContent = this.inputBuffer;
    this.textChanged.emit(this.textContent || '')
  }
}
