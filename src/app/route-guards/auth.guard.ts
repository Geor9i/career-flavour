import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../modules/fire/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const auth = authService.auth;
  if (auth && route.url[0].path === 'logout') {
      authService.logout();
      router.navigateByUrl('/')
      return true;
  }
  if (!auth) {
    router.navigateByUrl('/login')
    return false
  }

  return true;
};
