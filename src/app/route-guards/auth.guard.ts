import { CanActivateFn, Router } from '@angular/router';
import { FireService } from '../modules/fire/fire-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const fireservice = inject(FireService);
  const auth = fireservice.auth;
  if (auth.currentUser && route.url[0].path === 'logout') {
      fireservice.logout();
      router.navigateByUrl('/')
      return true;
  }

  if (!auth.currentUser) {
    router.navigateByUrl('/login')
    return false
  }

  return true;
};
