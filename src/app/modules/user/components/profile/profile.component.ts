import { ModalService } from 'src/app/modules/shared/modal/modal.service';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from 'src/app/modules/fire/fire-service';
import { Button } from 'src/app/modules/shared/modal/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('authModal') authModal!: TemplateRef<any>;
  @ViewChild('detailsModal') detailsModal!: TemplateRef<any>;

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

  selectedOption: string = '';
  constructor(
    private fireservice: FireService,
    private router: Router,
    private modalService: ModalService,
  ) {

  }

  private modalSubscription: Subscription | undefined;
  public buttons: Button[] = [
    { name: 'Submit', action: 'submit' },
    { name: 'Cancel', action: 'cancel' },
  ];
  public authButton: Button[] = [{ name: 'Authorise', action: 'submit' }];

  ngOnInit(): void {
    const displayName = this.fireservice.auth.currentUser?.displayName || '';
    [this.firstName, this.lastName] = displayName.split(' ');
    this.email = this.fireservice.auth.currentUser?.email;
  }
  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }

  accountSubmitHandler(form: NgForm) {
    this.modalSubscription = this.modalService
      .open(this.detailsModal, { buttons: this.buttons })
      .subscribe((action) => {
        if (action === 'confirm') {
          this.fireservice.updateDisplayName(form.value).subscribe({
            next: () => {
              this.router.navigateByUrl('/');
            },
            error: (err) => {
              throw new Error(err);
            },
          });
        }
      });
  }

  passwordUpdateSubmitHandler(form: NgForm) {
    this.modalSubscription = this.modalService
      .open(this.authModal, { buttons: this.authButton})
      .subscribe((action) => {

        console.log(action);

          // const { password, repeatPassword } = form.value;
          // if (password === repeatPassword) {
          //   this.fireservice.changePassword(password).subscribe({
          //     next: () => {
          //       this.router.navigateByUrl('/');
          //     },
          //     error: (err) => {
          //       throw new Error(err);
          //     },
          //   });
          // }
      });
  }

  emailUpdateSubmitHandler(form: NgForm) {
    this.modalSubscription = this.modalService
      .open(this.authModal, { buttons: this.authButton })
      .subscribe((action) => {
        if (action === 'confirm') {
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
      });
  }
}
