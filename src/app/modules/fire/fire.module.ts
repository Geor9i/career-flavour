import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from 'src/environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
})
export class FireModule {}
