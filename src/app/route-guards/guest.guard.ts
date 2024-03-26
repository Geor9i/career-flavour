import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { FireService } from '../modules/fire/fire-service';
import { inject } from '@angular/core';
import { authState } from '@angular/fire/auth';

export const guestGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const fireservice = inject(FireService);




  return true

};

