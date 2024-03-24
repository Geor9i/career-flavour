import { JSEventManagerService } from 'src/app/modules/event-bus/jsevent-manager.service';
import { JSEventBusService } from './modules/event-bus/jsevent-bus.service';
import { Component } from '@angular/core';
import { JSEvent } from './modules/event-bus/types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'career-flavour';
  constructor(private jsEventManagerService: JSEventManagerService) {}

}
