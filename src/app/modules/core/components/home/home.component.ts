import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthFormComponent } from 'src/app/modules/shared/components/auth-form/auth-form.component';
import { TemplateModalService } from 'src/app/modules/shared/templateModal/templateModal.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/fire/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private templateModalService: TemplateModalService,
    private authService: AuthService,
    private router: Router,
    ) {}
    private busSubscription!: Subscription
  toResumeBuilder() {
    const isAuth = this.authService.auth.currentUser;
    console.log(isAuth);

    if (!isAuth) {
      this.busSubscription = this.templateModalService
        .open(AuthFormComponent)
        .subscribe((observer) => {
          console.log(observer);

          if (observer.data && observer.data['confirm']) {
            this.router.navigateByUrl('/resume-templates');
          }
          this.busSubscription.unsubscribe();
        });
    } else {
      this.router.navigateByUrl('/resume-templates');
    }
  }
}
