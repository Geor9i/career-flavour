import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
    private onUnhandledException = new Subject();
    onUnhandledException$ = this.onUnhandledException.asObservable();

    setMessage(message: Error){
        this.onUnhandledException.next(message);
    }
}
