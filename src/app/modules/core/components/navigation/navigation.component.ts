import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { FireService } from 'src/app/modules/fire/fire-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  isAuthUser = false;
  public userName = '';
  private userSubscription!: Subscription;
  private routerSubscription!: Subscription;
  public currentNav = 'guest';
  public activeMenu = '';
  constructor(private fireservice: FireService, private router: Router) {}

  ngOnInit(): void {
    // this.routerSubscription = this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     const { url } = this.router;
    //     if (url.startsWith('/resume-editor')) {
    //       this.currentNav = 'user'
    //     } else {
    //       this.currentNav = 'guest'
    //     }
    //   });

    this.userSubscription = this.fireservice
      .onAuthStateChanged((user) => {
        this.isAuthUser = !!user;
        if (this.isAuthUser) {
          this.currentNav = 'user'
          this.userName = user?.displayName ? user.displayName : '';
        } else {
          this.currentNav = 'guest'
        }
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  toggleMenu(menu: string) {
    if (this.activeMenu) {
      this.activeMenu = ''
    } else {
      this.activeMenu = menu;
    }
  }
}
