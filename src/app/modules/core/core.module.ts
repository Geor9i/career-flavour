import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CoreRoutingModule } from './core-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { FireModule } from '../fire/fire.module';
import { AboutPageComponent } from './components/about-page/about-page.component';

@NgModule({
  declarations: [HomeComponent, NavigationComponent, AboutPageComponent],
  imports: [CommonModule, CoreRoutingModule, SharedModule, FireModule],
  exports: [NavigationComponent],
})
export class CoreModule {}
