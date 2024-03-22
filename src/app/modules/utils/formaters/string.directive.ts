import { UtilService } from './../util.service';
import { Directive, Renderer2, ElementRef } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appString]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: StringDirective,
      multi: true,
    },
  ],
})
export class StringDirective implements Validator {
  public stringUtil = this.utilService.stringUtil;
  constructor(
    private utilService: UtilService,
    private elRef: ElementRef,
    private renderer: Renderer2
    ) {
    }

  validate(
    control: AbstractControl<unknown, unknown>
  ): ValidationErrors | null {
    let value = control.value as string;
    if (value !== null) {
      value = this.stringUtil.filterString(value, [
        { symbol: `\\s`, remove: true },
      ]);
    }

    this.renderer.setProperty(this.elRef.nativeElement, 'value', value);

    return null;
  }
}
