import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { StringUtil } from './string-util';



@NgModule({
  declarations: [
    EmailDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [EmailDirective],
  providers:[StringUtil]
})
export class UtilsModule { }
