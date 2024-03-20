import { ModalService } from 'src/app/modules/shared/modal/modal.service';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from 'src/app/modules/fire/fire-service';
import { Button } from 'src/app/modules/shared/modal/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  firstName: string = '';
  lastName: string = '';
  email: string | null | undefined = '';
  modalQuestion = 'Are you sure?';
  public formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  };

  // private modalService = inject(ModalService);
  selectedOption: string = '';
  constructor(private fireservice: FireService, private router: Router, private modalService: ModalService) {}

  openModal(modalTemplate: TemplateRef<unknown | any>) {

    const buttons: Button[] = [{name: 'Submit', action: 'submit'}, {name: 'Cancel', action: 'cancel'}];
    this.modalService.open(modalTemplate, { size: 'lg', title: 'Foo', buttons })
      .subscribe((action) => {
        console.log('modalAction: ', action);
      });
  }

  ngOnInit(): void {
    const displayName = this.fireservice.auth.currentUser?.displayName || '';
    [this.firstName, this.lastName] = displayName.split(' ');
    this.email = this.fireservice.auth.currentUser?.email;
  }
  ngOnDestroy(): void {}

  accountSubmitHandler(form: NgForm) {
    this.fireservice.updateDisplayName(form.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        throw new Error(err);
      },
    });
  }

  passwordUpdateSubmitHandler(form: NgForm) {
    const { password, repeatPassword } = form.value;
    if (password === repeatPassword) {
      this.fireservice.changePassword(password).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          throw new Error(err);
        },
      });
    }
  }

  emailUpdateSubmitHandler(form: NgForm) {
    const { email } = form.value;
    this.fireservice.changeEmail(email).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        throw new Error(err);
      },
    });
  }
}
