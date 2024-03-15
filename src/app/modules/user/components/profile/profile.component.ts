import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire/fire-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  email: string | null | undefined = '';
  public formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  };

 constructor(private fireservice: FireService,  private router: Router) {}

  ngOnInit(): void {
    const displayName = this.fireservice.auth.currentUser?.displayName || '';
    [this.firstName, this.lastName] = displayName.split(' ');
    this.email = this.fireservice.auth.currentUser?.email;
  }

  accountSubmitHandler(form: NgForm) {
    this.fireservice.updateDisplayName(form.value).subscribe(() => {
      this.router.navigateByUrl('/');
    })
  }

  passwordUpdateSubmitHandler(form: NgForm) {
    console.log(form);
  }

  emailUpdateSubmitHandler(form: NgForm) {
    console.log(form);
  }

}
