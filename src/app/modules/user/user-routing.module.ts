import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { guestGuard } from 'src/app/route-guards/guest.guard';

const routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
