import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { guestGuard } from 'src/app/route-guards/guest.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from 'src/app/route-guards/auth.guard';
import { ResetAccountPasswordComponent } from './components/reset-account-password/reset-account-password.component';

const routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { path: 'reset-account-password', component: ResetAccountPasswordComponent, canActivate: [guestGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
