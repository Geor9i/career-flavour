import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToPascalCasePipe } from './stringPipes/to-pascal-case.pipe';



@NgModule({
  declarations: [
    ToPascalCasePipe
  ],
  imports: [
    CommonModule
  ],
   exports: [ToPascalCasePipe]
})
export class PipesModule { }
