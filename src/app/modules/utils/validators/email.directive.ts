import { Directive, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { StringUtil } from '../string-util';

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
export class EmailDirective implements Validator, OnChanges {
  @Input() appEmail: string[] = [];
  private stringUtil = inject(StringUtil);
  constructor() {}

  validator: ValidatorFn = () => null;

  validate(control: AbstractControl): ValidationErrors | null {
    // console.log('control', control);
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes['appEmail']);
    const { currentValue } = changes['appEmail'];
    if (currentValue?.length) {
      this.validator = this.stringUtil.emailValidator(currentValue);
    }
  }
}
