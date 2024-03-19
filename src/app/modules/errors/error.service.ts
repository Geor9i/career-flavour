// error-handler.service.ts

import { Injectable, ErrorHandler } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private errorSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.handleError = this.handleError.bind(this); // Bind handleError to ensure 'this' refers to the instance of GlobalErrorHandler
  }

  handleError(error: any): void {
    console.error('Global error handler:', error);
    this.errorSubject.next(error);
  }

  getErrorStream() {
    return this.errorSubject.asObservable();
  }
}
