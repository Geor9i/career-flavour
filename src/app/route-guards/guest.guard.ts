import { CanActivateFn } from '@angular/router';
import { FireService } from '../services/fire/fire-service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const fireservice = inject(FireService);
  const auth = fireservice.auth;
  if (route.url.length > 0) {
    if (!auth.currentUser) {
      return true;
    }
  }
  return false;
};
