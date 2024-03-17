import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { FireModule } from 'src/app/services/fire/fire.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UtilsModule } from '../utils/utils.module';
import { AnimationsModule } from '../animations/animations.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, //Template driven
    FireModule,
    UtilsModule,
    AnimationsModule,
  ],
  exports: [],
})
export class UserModule {}
