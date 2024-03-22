import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [{ path: 'home', component: HomeComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
