import { JSEventManagerService } from 'src/app/modules/event-bus/jsevent-manager.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'career-flavour';
  constructor(private jsEventManagerService: JSEventManagerService) {}

}
