import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResumeTemplatesPageComponent } from './components/resume-templates-page/resume-templates-page.component';
import { authGuard } from 'src/app/route-guards/auth.guard';

const routes = [
  {
    path: 'resume-templates',
    component: ResumeTemplatesPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeTemplatesRoutingModule {}
