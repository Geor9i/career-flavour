import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ErrorMessageService } from '../../error-message.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css'],
})
export class ErrorDisplayComponent implements OnInit, OnDestroy {
  public errors: Error[] = [];
  private errorMessageSubscription: Subscription | undefined;

  constructor(private errorMessageService: ErrorMessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.errorMessageSubscription = this.errorMessageService.onUnhandledException$.subscribe((error: unknown) => {
      this.errors.push(error as Error)
      console.log(this.errors);
      timer(1000).subscribe(() => {
        this.removeError(error as Error);
        this.cdr.detectChanges(); // Trigger change detection
      });
    });
  }

  private removeError(error: Error): void {
    const index = this.errors.indexOf(error);
    if (index !== -1) {
      this.errors.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
  }
}
