import { ModalService } from 'src/app/modules/shared/modal/modal.service';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from 'src/app/modules/fire/fire-service';
import { Button } from 'src/app/modules/shared/modal/types';
import { Subscription } from 'rxjs';
import { TemplateModalService } from 'src/app/modules/shared/templateModal/templateModal.service';
import { AuthFormComponent } from 'src/app/modules/shared/components/auth-form/auth-form.component';
import { BusData } from 'src/app/modules/event-bus/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('detailsModal') detailsModal!: TemplateRef<any>;

  firstName: string = '';
  lastName: string = '';
  email: string | null | undefined = '';
  selectedOption: string = '';
  constructor(
    private fireservice: FireService,
    private router: Router,
    private modalService: ModalService,
    private templateModalService: TemplateModalService
  ) {}

  private modalSubscription: Subscription | undefined;
  private templateModalSubscription: Subscription | undefined;

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
    this.templateModalSubscription?.unsubscribe();
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
    this.templateModalSubscription = this.templateModalService
      .open(AuthFormComponent)
      .subscribe((observer) => {
        if (observer.data && observer.data['confirm']) {
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

        this.templateModalSubscription?.unsubscribe();
      });
  }

  emailUpdateSubmitHandler(form: NgForm) {
    this.templateModalSubscription = this.templateModalService
      .open(AuthFormComponent)
      .subscribe((observer) => {
        if (observer.data && observer.data['confirm']) {
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
        this.templateModalSubscription?.unsubscribe();
      });
  }
}
