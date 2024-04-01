import { JSEventManagerService } from 'src/app/modules/event-bus/jsevent-manager.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/fire/auth-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'career-flavour';
  constructor(private jsEventManagerService: JSEventManagerService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.auth.onAuthStateChanged(user => {
      this.authService.user = user;
    })
  }
}
