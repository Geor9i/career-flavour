import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
