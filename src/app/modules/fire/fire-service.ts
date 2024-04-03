import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  deleteDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { isEqual } from 'lodash';

import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { AuthService } from './auth-service';
import { dbs } from 'src/app/constants/dbConstants';
import { Unsubscribe } from '@angular/fire/auth';
import { UtilService } from '../utils/util.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class FireService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private utilService = inject(UtilService);
  private objectUtil = this.utilService.objectUtil;
  private onSnapshotInitialised = false;
  private userData$$ = new BehaviorSubject<DocumentData>({});
  private _userData!: DocumentData;
  private userDataUnsubscribe: Unsubscribe = () => {};
  constructor(private authService: AuthService) {
    this.authService.userObservable$.subscribe((user) => {
      if (user && user.uid && !this.onSnapshotInitialised) {
        const docRef = doc(this.firestore, dbs.USERS, user.uid);
        this.userDataUnsubscribe = onSnapshot(docRef, (observer) => {
          if (observer.exists()) {
            const result = observer.data();
            this.userData$$.next(result);
            this._userData = result;
          }
        });
      } else if (!user) {
        this.userDataUnsubscribe();
        this.userData$$.next({});
        this._userData = {};
      }
    });
  }

  get userData() {
    return this.userData$$.asObservable();
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

  saveToDB(data: any, pathToProp: string): Observable<DocumentData> {
    return new Observable((observer) => {
      console.log('data: ', data);
      console.log('userdata: ', this._userData);
      console.log('pathToProp: ', pathToProp);

      const user = this.authService.auth.currentUser;
      if (!user) {
        observer.error('No active user!');
        observer.complete();
        return;
      }
      if (this._userData) {
        const nestedPropUserData = this.objectUtil.getNestedProperty(
          this._userData,
          pathToProp
        );
        if (isEqual(nestedPropUserData, data)) {
          console.log('Data is the same, no need to save.');
          observer.next();
          observer.complete();
          return;
        }
      }

      const finalData = this.objectUtil.setNestedProperty(
        this._userData,
        pathToProp,
        data
      );
      const docRef = doc(this.firestore, dbs.USERS, user.uid);
      setDoc(docRef, finalData)
        .then(() => {
          console.log('Data saved Sucessfully!');
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  getPublicTemplates(): Observable<DocumentData[]> {
    return new Observable((observer) => {
      const collectionRef = collection(this.firestore, dbs.PUBLIC);
      const unsubscribe = getDocs(collectionRef)
        .then((querySnapshot) => {
          const documentsData = querySnapshot.docs.map((doc) => doc.data());
          observer.next(documentsData);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });

      return () => {
        unsubscribe.then(() => {}).catch(() => {});
      };
    });
  }

  getOnePublicTemplate(id: string): Observable<DocumentData> {
    return new Observable((observer) => {
      const docRef = doc(this.firestore, dbs.PUBLIC, id);
      getDoc(docRef)
        .then((data) => {
          if (data.exists()) {
            observer.next(data.data());
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  publish(data: DocumentData, id:string): Observable<DocumentData> {
    return new Observable((observer) => {
      const user = this.authService.auth.currentUser;
      if (!user) {
        observer.error('No active user!');
      }
      const username = (user?.displayName || '').split(' ')[0];
      let publicId = `public-${id}`;
      const finalData = {
        ...data,
        id: publicId,
        authorId: user?.uid,
        username,
      };
      const docRef = doc(this.firestore, dbs.PUBLIC, publicId);
      setDoc(docRef, finalData)
        .then(() => {
          console.log('Data saved Sucessfully!');
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  unpublish(id: string): Observable<void> {
    return new Observable((observer) => {
      const publicId = `public-${id}`;
      this.getPublicTemplates().subscribe((data) => {
        const isPublic = data.find((document) => document?.['id'] === publicId);
        if (isPublic) {
          const docRef = doc(this.firestore, dbs.PUBLIC, publicId);
          deleteDoc(docRef)
            .then(() => {
              observer.complete();
            })
            .catch((err) => {
              observer.error(err);
            });
        }
      });
    });
  }

  isAuthor(resumeId: string): Observable<boolean | null> {
    return new Observable((observer) => {
      const user = this.authService.auth.currentUser;
      if (!user) {
        observer.error(new Error('No active user!'));
      }
      return this.getOnePublicTemplate(resumeId).subscribe((resume) => {
        if (resume) {
          const isAuthor = resume['uid'] === user?.uid;
          observer.next(isAuthor);
          observer.complete();
        } else {
          observer.error('Resume is not public!');
        }
      });
    });
  }

  async deleteUserData() {
    if (
      this.authService?.auth?.currentUser &&
      this.authService?.auth?.currentUser?.uid
    ) {
      const uid = this.authService.auth.currentUser.uid;
      const docRef = doc(this.firestore, dbs.USERS, uid);
      await deleteDoc(docRef);
    }
  }

  async deleteResume(documentId: string): Promise<void> {
    const user = this.authService.auth?.currentUser;
    if (user) {
      const data = { ...this._userData };
      const path = `resumes.${documentId}`;
      let finishedObj = this.objectUtil.deleteNestedProperty(data, path);
      const docRef = doc(this.firestore, dbs.USERS, user.uid);
      return setDoc(docRef, finishedObj)
        .then(() => {
          console.log('Resume Deleted!');
        })
        .catch((err) => {});
    }
  }

  getFileUrl(filePath: string) {
    const fileRef = ref(this.storage, filePath);
    return getDownloadURL(fileRef);
  }
}
