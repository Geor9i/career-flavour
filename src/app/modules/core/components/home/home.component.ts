import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthFormComponent } from 'src/app/modules/shared/components/auth-form/auth-form.component';
import { TemplateModalService } from 'src/app/modules/shared/templateModal/templateModal.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/fire/auth-service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private templateModalService: TemplateModalService,
    private authService: AuthService,
    private router: Router,
    ) {}
    public name = '';
    private busSubscription!: Subscription
    public user: User | null = null;
    ngOnInit(): void {
      this.authService.userObservable$.subscribe((user) => {
        this.user = user;
        this.name = user?.displayName?.split(' ')[0] || '';
      })
    }

  toResumeBuilder() {
    const isAuth = this.authService.auth.currentUser;
    if (!isAuth) {
      this.busSubscription = this.templateModalService
        .open(AuthFormComponent)
        .subscribe((observer) => {
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
