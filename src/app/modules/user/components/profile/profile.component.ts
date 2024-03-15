import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FireService } from 'src/app/services/fire/fire-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('emailForm') emailForm: NgForm | undefined;

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

  constructor(private fireservice: FireService) {}

  ngOnInit(): void {
    console.log(`emailForm: `, this.emailForm);

    const displayName = this.fireservice.auth.currentUser?.displayName || '';
    [this.firstName, this.lastName] = displayName.split(' ');
    this.email = this.fireservice.auth.currentUser?.email;
  }

  accountSubmitHandler(form: NgForm) {
    console.log(form);
  }

  passwordUpdateSubmitHandler(form: NgForm) {
    console.log(form);
  }

  emailUpdateSubmitHandler(form: NgForm) {
    console.log(form);
  }

  inputChangeHandler() {}
}
