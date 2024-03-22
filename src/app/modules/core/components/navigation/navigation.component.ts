import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FireService } from 'src/app/modules/fire/fire-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isAuthUser = false;
  private userSubscription!: Subscription;

  constructor(private fireservice: FireService) {}

  ngOnInit(): void {
    this.userSubscription = this.fireservice.onAuthStateChanged(user => {
      this.isAuthUser = !!user;
    }).subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
