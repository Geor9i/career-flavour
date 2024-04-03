import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ErrorMessageService } from '../../error-message.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDisplayComponent implements OnInit, OnDestroy {
  public errorMessage: string | undefined;
  private errorMessageSubscription: Subscription | undefined;

  constructor(private errorMessageService: ErrorMessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.errorMessageSubscription = this.errorMessageService.onUnhandledException$.subscribe((error: unknown) => {
      this.errorMessage = this.extractErrorMessage(error);
      this.detectChanges(); // Manually trigger change detection
      timer(1000).subscribe(() => {
        this.clearErrorMessage();
        this.detectChanges(); // Manually trigger change detection
      });
    });
  }

  private extractErrorMessage(error: unknown): string {
    // Extract and format the error message as needed
    return error instanceof Error ? error.message : 'An error occurred.';
  }

  private clearErrorMessage(): void {
    this.errorMessage = undefined;
  }

  private detectChanges(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
  }
}
