import { Component, ViewContainerRef, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from 'src/app/modules/fire/fire-service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {
  vcr = inject(ViewContainerRef);
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



