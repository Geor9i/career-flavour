import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { FireModule } from 'src/app/services/fire/fire.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, //Template driven
    FireModule,
    UtilsModule,
  ],
  exports: []
})
export class UserModule { }
