import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FireService } from 'src/app/modules/fire/fire-service';
import { AuthFormComponent } from 'src/app/modules/shared/components/auth-form/auth-form.component';
import { TemplateModalService } from 'src/app/modules/shared/templateModal/templateModal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private templateModalService: TemplateModalService,
    private fireService: FireService,
    private router: Router,
    ) {}
    private busSubscription!: Subscription
  toResumeBuilder() {
    const isAuth = this.fireService.auth.currentUser;
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
