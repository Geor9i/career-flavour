import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  deleteDoc
} from '@angular/fire/firestore';
import { isEqual } from 'lodash';

import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { dbs } from 'src/app/constants/dbConstants';
import { Unsubscribe } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class FireService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private onSnapshotInitialised = false;
  private userData$$ = new BehaviorSubject<DocumentData>({});
  private _userData!: DocumentData;
  private userDataUnsubscribe: Unsubscribe = () => {};
  constructor(private authService: AuthService) {
    this.authService.userObservable$.subscribe((user) => {
      if (user && user.uid && !this.onSnapshotInitialised) {
        const docRef = doc(this.firestore, dbs.USERS, user.uid);
        this.userDataUnsubscribe = onSnapshot(docRef, (observer) => {
          // console.log(observer.data());
          if (observer.exists()) {
            const result = observer.data();
            this.userData$$.next(result);
            this._userData = result
          }
        });
      } else if (!user) {
        this.userDataUnsubscribe();
        this.userData$$.next({});
      }
    });
  }

  get userData() {
    return this.userData$$.asObservable()
  }

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

  saveUserData(data: any, path: string, merge = true): Observable<DocumentData> {
    return new Observable((observer) => {
      const user = this.authService.auth.currentUser;
      if (!user) {
        observer.error('No active user!');
        observer.complete();
        return
      }
      if (this._userData && this._userData[path] && isEqual(this._userData[path], data)) {
        console.log('Data is the same, no need to save.');
        observer.next();
        observer.complete();
        return;
      }

      const docRef = doc(this.firestore, dbs.USERS, user?.uid as string);
      setDoc(docRef, { [path]: data }, { merge })
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

  async deleteUserData() {
    if (this.authService?.auth?.currentUser && this.authService?.auth?.currentUser?.uid) {
      const uid = this.authService.auth.currentUser.uid;
      const docRef = doc(this.firestore, dbs.USERS, uid)
       await deleteDoc(docRef)
    }
  }

  getFileUrl(filePath: string) {
    const fileRef = ref(this.storage, filePath);
    return getDownloadURL(fileRef);
  }
}
