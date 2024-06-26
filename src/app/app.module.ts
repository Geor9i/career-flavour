import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { UserModule } from './modules/user/user.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { SharedModule } from './modules/shared/shared.module';
import { GlobalErrorHandler } from './modules/errors/global-error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { ResumeBuilderModule } from './modules/resume-builder/resume-builder.module';
import { ResumeTemplatesModule } from './modules/resume-templates/resume-templates.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    UserModule,
    ErrorsModule,
    SharedModule,
    BrowserAnimationsModule,
    ResumeBuilderModule,
    ResumeTemplatesModule,
    AppRoutingModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
