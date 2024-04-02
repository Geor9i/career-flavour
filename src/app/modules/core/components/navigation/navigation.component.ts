import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from 'src/app/modules/fire/auth-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnDestroy, OnInit, AfterViewChecked{
  isAuthUser = false;
  public userName = '';
  private userSubscription!: Subscription;
  public currentNav = 'guest';
  public activeMenu = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewChecked(): void {
    if (this.userName === '') {
      this.userName = this.authService.auth.currentUser?.displayName || '';
    }
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.userObservable$.subscribe(auth => {
      this.currentNav = auth ? 'user' : 'guest'
        this.userName = auth?.displayName || '';
    })
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
