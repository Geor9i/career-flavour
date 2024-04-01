import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../modules/fire/auth-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class guestGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser()
        .then(user => {
          this.router.navigateByUrl('/')
          resolve(false)
        })
        .catch(err => {
          resolve(true);
        });
    });
  }
}
