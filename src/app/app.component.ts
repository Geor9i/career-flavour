import { JSEventBusService } from './modules/event-bus/jsevent-bus.service';
import { JSEventManagerService } from './modules/event-bus/jsevent-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'career-flavour';
  constructor(private JSEventManagerService: JSEventManagerService, private jSEventBusService: JSEventBusService){}

  ngOnInit(): void {
    console.log('here');

    this.jSEventBusService.subscribe('test', 'click', (() => {
      console.log('hello from app');
    }))
  }
}
