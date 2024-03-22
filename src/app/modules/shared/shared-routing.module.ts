import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../core/components/home/home.component';
import { guestGuard } from 'src/app/route-guards/guest.guard';

const routes = [{ path: 'toHome', component: HomeComponent, canActivate: [guestGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
