import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { StringDirective } from './formaters/string.directive';
import { StringUtil } from './string-util';
import FormUtil from './form-util';
import { RepeatPasswordDirective } from './validators/repeat-password.directive';



@NgModule({
  declarations: [
    EmailDirective,
    StringDirective,
    RepeatPasswordDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [EmailDirective, StringDirective, RepeatPasswordDirective],
  providers:[StringUtil, FormUtil]
})
export class UtilsModule { }
