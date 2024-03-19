import { Component, OnInit } from '@angular/core';
import { GlobalErrorHandler } from './modules/errors/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'career-flavour';

  constructor(private errorService: GlobalErrorHandler){}

  ngOnInit(): void {
    this.errorService.getErrorStream().subscribe(data => {
      console.log('1');

      console.log(data);

    })
  }
}
