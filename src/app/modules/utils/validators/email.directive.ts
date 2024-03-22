import { UtilService } from './../util.service';
import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

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
  private formUtil = this.utilService.formUtil;
  constructor(private utilService: UtilService) {}

  validate(
    control: AbstractControl<unknown, unknown>
  ): ValidationErrors | null {
    try {
      this.formUtil.formValidator({ email: control.value as string });
    } catch (error) {
      return { appEmail: true };
    }

    return null; // Return null if validation succeeds
  }
}
