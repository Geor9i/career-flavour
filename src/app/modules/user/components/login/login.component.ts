import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from 'src/app/modules/fire/fire-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private fireService = inject(FireService);
  private router = inject(Router);
  submitHandler(form: NgForm) {
    const { email, password } = form.value;
    this.fireService.login({ email, password }).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        throw new Error(err)
      },
    });
  }
}
