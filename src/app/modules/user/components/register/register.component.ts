import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from 'src/app/modules/fire/fire-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  router = inject(Router);
  errorMessage: string | null = null;
  private fireservice =  inject(FireService);
  // constructor(private fireservice: FireService) {}

  submitHandler(form: NgForm) {
    const { firstName, lastName, email, password, repeatPassword } =
      form?.value;

    this.fireservice
      .register({ firstName, lastName, email, password })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.errorMessage = err.code;
        },
      });

    form.reset();
  }
}
