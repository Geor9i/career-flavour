import { ValidatorFn } from "@angular/forms";

export class StringUtil {

  emailValidator(domains: string[]): ValidatorFn {
    const domainString = domains.join('|');
    const regExp = new RegExp(`\\w+@gmail\\.(${domainString})`);
    return (control) => {
      console.log('Test Regex: ', regExp.test(control.value));
      console.log('Control value: ', control.value);

      return null;
    };
  }
}
