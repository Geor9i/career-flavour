import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CoreRoutingModule } from './core-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { FireModule } from '../fire/fire.module';

@NgModule({
  declarations: [HomeComponent, NavigationComponent],
  imports: [CommonModule, CoreRoutingModule, SharedModule, FireModule],
  exports: [NavigationComponent],
})
export class CoreModule {}
