import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ResumeEditorComponent } from "./components/resume-editor/resume-editor.component";
import { authGuard } from "src/app/route-guards/auth.guard";

const routes = [{path: 'resume-editor/:id', component: ResumeEditorComponent, canActivate: [authGuard]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ResumeRoutingModule{}
