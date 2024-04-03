import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';

const routes = [{ path: 'home', component: HomeComponent }, { path: 'about', component: AboutPageComponent }];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
