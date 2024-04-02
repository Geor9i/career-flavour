import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResumeTemplatesPageComponent } from './components/resume-templates-page/resume-templates-page.component';
import { authGuard } from 'src/app/route-guards/auth.guard';
import { MyTemplatesComponent } from './components/my-templates/my-templates.component';

const routes = [
  {
    path: 'resume-templates',
    component: ResumeTemplatesPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'my-templates',
    component: MyTemplatesComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeTemplatesRoutingModule {}
