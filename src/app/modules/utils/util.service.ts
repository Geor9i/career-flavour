import { Injectable } from '@angular/core';
import StringUtil from './string-util';
import FormUtil from './form-util';
import ObjectUtil from './object.util';
import ResumeBuilderUtil from './resume-util';
import EventUtil from './event-util';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(
    public stringUtil: StringUtil,
    public formUtil: FormUtil,
    public objectUtil: ObjectUtil,
    public resumeBuilderUtil: ResumeBuilderUtil,
    public eventUtil: EventUtil
  ) {}
}
