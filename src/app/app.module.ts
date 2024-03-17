import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestReadComponent } from './test-read/test-read.component';
import { CoreModule } from './modules/core/core.module';
import { UserModule } from './modules/user/user.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [AppComponent, TestReadComponent],
  imports: [
    BrowserModule,
    CoreModule,
    UserModule,
    ErrorsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
