import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import {
  UserInterface,
  UserRegisterInterface,
} from 'src/app/modules/user/types/user.interface';
@Injectable({
  providedIn: 'root',
})
export class FireService {
  // constructor(private firestore: Firestore, private auth: Auth) {}
  private firestore = inject(Firestore);
  private fireAuth = inject(Auth);

  get auth() {
    return this.fireAuth;
  }

  onAuthStateChanged(callback: (user: User | null) => void): Observable<void> {
    return new Observable<void>((observer) => {
      const unsubscribe = onAuthStateChanged(this.fireAuth, (user) => {
        callback(user);
        observer.next();
      });
      return { unsubscribe };
    });
  }

  register(userData: UserRegisterInterface): Observable<void> {
    const { firstName, lastName, email, password } = userData;
    const promise = createUserWithEmailAndPassword(
      this.fireAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, {
        displayName: `${firstName} ${lastName}`,
      })
    );
    return from(promise);
  }

  login(userData: UserInterface): Observable<UserCredential> {
    const { email, password } = userData;
    const promise = signInWithEmailAndPassword(this.fireAuth, email, password);
    return from(promise);
  }

  logout() {
    return signOut(this.fireAuth);
  }

  testCollection = collection(this.firestore, 'test');

  getData<T>() {
    return collectionData(this.testCollection) as Observable<T[]>;
  }

  updateDisplayName({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }): Observable<void> {
    return new Observable((observer) => {
      if (this.fireAuth.currentUser) {
        updateProfile(this.fireAuth.currentUser, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            observer.next();
            observer.complete();
          })
          .catch((err) => {
            observer.error(err);
          });
      } else {
        observer.error(new Error('No active user!'));
      }
    });
  }
}
