import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/fire/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  router = inject(Router);
  errorMessage: string | null = null;
  private authService =  inject(AuthService);

  submitHandler(form: NgForm) {
    const { firstName, lastName, email, password, repeatPassword } =
      form?.value;

    this.authService
      .register({ firstName, lastName, email, password })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          throw new Error(err)
        },
      });

    form.reset();
  }
}
