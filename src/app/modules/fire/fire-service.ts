import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { dbs } from 'src/app/constants/dbConstants';
import { UserData } from './types/interfaces';
@Injectable({
  providedIn: 'root',
})
export class FireService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  constructor(private authService: AuthService) {}

  testCollection = collection(this.firestore, 'test');

  getUserData(): Observable<DocumentData> {
    return new Observable((observer) => {
      const user = this.authService.auth.currentUser;
      if (!user) {
        observer.complete();
        return;
      }
      const userDoc = doc(this.firestore, dbs.USERS, user.uid);
      getDoc(userDoc)
        .then((data) => {
          if (!data.exists()) {
            // Document doesn't exist, create it
            return setDoc(userDoc, {
              username: user.displayName,
            }).then(() => {
              // Document created, fetch its data and emit
              return getDoc(userDoc);
            });
          } else {
            // Document exists, emit its data
            return data;
          }
        })
        .then((data) => {
          observer.next(data.data());
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
          observer.complete();
        });
    });
  }

  saveUserData(data: UserData, path: string): Observable<DocumentData> {
    return new Observable((observer) => {
      const user = this.authService.auth.currentUser;
      if (!user) {
        observer.error('No active user!');
        observer.complete();
      }
      const docRef = doc(this.firestore, dbs.USERS, user?.uid as string);
      setDoc(docRef, { [path]: data }, { merge: true })
        .then(() => {
          console.log('Data saved Sucessfully!');
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
          observer.complete();
        });
    });
  }

  getData<T>() {
    return collectionData(this.testCollection) as Observable<T[]>;
  }

  getFileUrl(filePath: string) {
    const fileRef = ref(this.storage, filePath);
    return getDownloadURL(fileRef);
  }
}
