import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ErrorRoutingModule } from './components/error-page/error-routing.module';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { GlobalErrorHandler } from './error.service';

@NgModule({
  declarations: [ErrorPageComponent, ErrorDisplayComponent],
  imports: [CommonModule, ErrorRoutingModule],
  providers: [GlobalErrorHandler],
  exports: [ErrorDisplayComponent]
})
export class ErrorsModule{
}
