import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { StringDirective } from './formaters/string.directive';
import { RepeatPasswordDirective } from './validators/repeat-password.directive';
import StringUtil from './string-util';
import ObjectUtil from './object.util';
import ResumeBuilderUtil from './resume-util';
import FormUtil from './form-util';
import EventUtil from './event-util';

@NgModule({
  declarations: [EmailDirective, StringDirective, RepeatPasswordDirective],
  imports: [CommonModule],
  exports: [EmailDirective, StringDirective, RepeatPasswordDirective],
  providers: [StringUtil, ObjectUtil, ResumeBuilderUtil, FormUtil, EventUtil]
})
export class UtilsModule {}
