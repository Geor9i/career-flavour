import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlowFieldsDirective } from './glow-fields.directive';



@NgModule({
  declarations: [
    GlowFieldsDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[GlowFieldsDirective]
})
export class AnimationsModule { }
