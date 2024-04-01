import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/fire/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  submitHandler(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login({ email, password }).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        throw new Error(err)
      },
    });
  }
}
