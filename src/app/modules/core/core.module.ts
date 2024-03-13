import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core-routing.module';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [HomeComponent, NavigationComponent],
  imports: [CommonModule, CoreRoutingModule],
  exports: [NavigationComponent],
})
export class CoreModule {}
