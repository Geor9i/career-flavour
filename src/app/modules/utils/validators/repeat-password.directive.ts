import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RepeatPasswordDirective, multi: true }]
})
export class RepeatPasswordDirective implements Validator {

  public repeatPasswordControl: AbstractControl | null = null;
  public passwordControl: AbstractControl | null = null;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    this.repeatPasswordControl = control.root.get('repeatPassword');
    this.passwordControl = control.root.get('password');

    if (this.passwordControl && this.repeatPasswordControl) {

      if (this.passwordControl.invalid && this.repeatPasswordControl.dirty) {
        return this.isPassCtrl(control) ? null : {repeatPasswordError: true}
      }

      if (this.passwordControl.valid && this.repeatPasswordControl.value !== this.passwordControl.value) {
        if (this.isPassCtrl(control)) {
          this.repeatPasswordControl.setErrors({repeatPasswordError: true})
          this.repeatPasswordControl.updateValueAndValidity();
        } else {
          return {repeatPasswordError: true}
        }
      } 

    }
    return null;
  }

  isPassCtrl(control: AbstractControl) {
    return control === this.passwordControl;
  }
}

