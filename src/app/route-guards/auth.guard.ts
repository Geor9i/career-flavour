import { CanActivateFn } from '@angular/router';
import { FireService } from '../modules/fire/fire-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const fireservice = inject(FireService);
  const auth = fireservice.auth;
  if (route.url.length > 0) {
    if (route.url[0].path === 'logout' && auth.currentUser) {
      fireservice.logout();
      return true;
    } else if (auth.currentUser) {
      return true;
    }
  }
  return false;
};
