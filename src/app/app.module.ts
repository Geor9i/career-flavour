import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from 'src/environments/environment';
import { TestReadComponent } from './test-read/test-read.component';
import { CoreModule } from './modules/core/core.module';
import { UserModule } from './modules/user/user.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { NavigationComponent } from './modules/core/navigation/navigation.component';

@NgModule({
  declarations: [AppComponent, TestReadComponent],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    CoreModule,
    UserModule,
    ErrorsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
