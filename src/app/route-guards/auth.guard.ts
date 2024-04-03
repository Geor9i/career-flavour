import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../modules/fire/auth-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService
        .getCurrentUser()
        .then((user) => {
          if (user && route.url[0].path === 'logout') {
            this.authService.logout();
            this.router.navigateByUrl('/');
            resolve(true);
          }
          if (!user) {
            this.router.navigateByUrl('/login');
            resolve(false);
          }
          resolve(true);
        })
        .catch((err) => {
          resolve(false);
          this.router.navigateByUrl('/login');
          throw new Error(err)
        });
    });
  }
}
