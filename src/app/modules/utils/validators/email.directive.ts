import { Directive, Input, inject } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import FormUtil from '../form-util';

@Directive({
  selector: '[appEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true,
    },
  ],
})
export class EmailDirective implements Validator {
  private formUtil = inject(FormUtil);
  constructor() {}

  validate(control: AbstractControl<unknown, unknown>): ValidationErrors | null {
    try {
      this.formUtil.formValidator({ email: control.value as string });
    } catch (error) {
      return { appEmail: true };
    }

    return null; // Return null if validation succeeds
  }
}
