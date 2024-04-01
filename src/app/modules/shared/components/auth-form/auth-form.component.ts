import { EventBusService } from './../../../event-bus/event-bus.service';
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/fire/auth-service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent {
  private authService = inject(AuthService);
  constructor(private eventBus: EventBusService) {}
  submitHandler(form: NgForm) {
    const { email, password } = form.value;
    form.reset();
    this.authService.reAuth({ email, password }).subscribe({
      next: () => {
        this.eventBus.emit({
          event: 'TemplateModalContentOutput',
          data: { confirm: true },
        });
      },
      error: (err) => {
        this.eventBus.emit({
          event: 'TemplateModalContentOutput',
          data: { confirm: false },
        });
        throw new Error(err);
      },
    });
  }
}
