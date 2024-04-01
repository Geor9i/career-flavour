import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/fire/auth-service';

@Component({
  selector: 'app-reset-account-password',
  templateUrl: './reset-account-password.component.html',
  styleUrls: ['./reset-account-password.component.css']
})
export class ResetAccountPasswordComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public activeForm = true;
  submitHandler(form: NgForm) {
    const { email } = form.value;
    this.authService.resetPassword(email).subscribe({
      next: (data) => {
        this.activeForm = false;
      },
      error: (err) => {
        throw new Error(err)
      },
    });
  }
}
