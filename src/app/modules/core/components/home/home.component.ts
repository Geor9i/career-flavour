import { JSEventBusService } from './../../../event-bus/jsevent-bus.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireService } from 'src/app/modules/fire/fire-service';
import { AuthFormComponent } from 'src/app/modules/shared/components/auth-form/auth-form.component';
import { TemplateModalService } from 'src/app/modules/shared/templateModal/templateModal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private templateModalService: TemplateModalService,
    private fireService: FireService,
    private router: Router,
    private jSEventBusService: JSEventBusService
  ) {}
  private busId = 'HomeComponent';
  private jsEventUnsub: any;
  ngOnInit(): void {

    this.jsEventUnsub = this.jSEventBusService.subscribe(this.busId, 'click', (() => {
      console.log('helloHome');
    }))
  }

  ngOnDestroy(): void {
    this.jsEventUnsub()
  }

  toResumeBuilder() {
    const isAuth = this.fireService.auth.currentUser;
    if (!isAuth) {
      this.templateModalService
        .open(AuthFormComponent)
        .subscribe((observer) => {
          if (observer.data && observer.data['confirm']) {
            this.router.navigateByUrl('/resume-templates');
          }
        });
    } else {
      this.router.navigateByUrl('/resume-templates');
    }
  }
}
