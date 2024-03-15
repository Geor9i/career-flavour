import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { StringDirective } from './formaters/string.directive';
import { StringUtil } from './string-util';
import FormUtil from './form-util';



@NgModule({
  declarations: [
    EmailDirective,
    StringDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [EmailDirective, StringDirective],
  providers:[StringUtil, FormUtil]
})
export class UtilsModule { }
