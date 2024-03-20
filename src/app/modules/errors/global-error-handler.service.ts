// global-error-handler.service.ts

import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorMessageService } from './error-message.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorMessageService: ErrorMessageService) {}

  handleError(error: Error): void {
    this.errorMessageService.setMessage(error);
  }
}
