import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import FormUtil from '../form-util';
import { Observable, from } from 'rxjs';

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


  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    try {
      console.log(control.value);

      this.formUtil.formValidator({email: control.value});
      console.log(this.formUtil.formValidator({email: control.value}))
    } catch (error) {
      console.log(error);

      return { invalidEmail: true };
    }

    return null; // Return null if validation succeeds
  }
}
