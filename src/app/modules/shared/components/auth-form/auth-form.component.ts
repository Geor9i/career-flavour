import { EventBusService } from './../../../event-bus/event-bus.service';
import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FireService } from 'src/app/modules/fire/fire-service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent {
  private fireService = inject(FireService);
  constructor(private eventBus: EventBusService) {}
  submitHandler(form: NgForm) {
    const { email, password } = form.value;
    form.reset();
    this.fireService.reAuth({ email, password }).subscribe({
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
