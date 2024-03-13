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

@NgModule({
  declarations: [AppComponent, TestReadComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    CoreModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
