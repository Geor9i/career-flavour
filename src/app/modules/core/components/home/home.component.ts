import { FireService } from 'src/app/modules/fire/fire-service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFormComponent } from 'src/app/modules/shared/components/auth-form/auth-form.component';
import { TemplateModalService } from 'src/app/modules/shared/templateModal/templateModal.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/fire/auth-service';
import { User } from '@angular/fire/auth';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private templateModalService: TemplateModalService,
    private authService: AuthService,
    private router: Router,
    private fireService: FireService
    ) {}
    private authSubscription!:Subscription;
    public name = '';
    private busSubscription!: Subscription
    public user: User | null = null;
    public publicResumeCount = 0;
    public userResumeCount = 0;
    private newId = `${Date.now()}${uuidv4()}`;

    ngOnInit(): void {
    this.authSubscription = this.authService.userObservable$.subscribe((user) => {
        this.user = user;
        this.name = user?.displayName?.split(' ')[0] || '';
      })
      this.userResumeCount = this.fireService.getResumeCount();
      this.fireService.getPublicTemplates().subscribe(data => {
        this.publicResumeCount = data.length ?? 0;
      })
    }

    ngOnDestroy(): void {
      this.authSubscription.unsubscribe()
    }

  toResumeBuilder(route: string) {
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

      if (route === 'resume-editor') {
        this.router.navigate([route, this.newId]);
      } else {
        this.router.navigate([route]);
      }
    }
  }
}
