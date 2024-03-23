import { Injectable, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  deleteUser
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import {
  UserInterface,
  UserRegisterInterface,
} from 'src/app/modules/user/types/user.interface';
import { Conditional } from './types/interfaces';
@Injectable({
  providedIn: 'root',
})
export class FireService {
  private firestore = inject(Firestore);
  private fireAuth = inject(Auth);
  constructor() {}

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

  reAuth(userData: UserInterface) {
    return new Observable((observer) => {
      if (this.fireAuth.currentUser) {
        const credential = EmailAuthProvider.credential(userData.email, userData.password);
        reauthenticateWithCredential(this.fireAuth.currentUser, credential)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((err: Error) => {
          observer.error(err);
        });
      }
    })
  }

  deleteAccount() {
    if (this.fireAuth.currentUser) {
      deleteUser(this.fireAuth.currentUser)
    }
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
    const displayName = `${firstName} ${lastName}`;
    return this.wrapToObservable(updateProfile, {
      params: [{ displayName }],
      conditional: { name: 'User', value: this.fireAuth.currentUser },
    });
  }

  changePassword(password: string): Observable<void> {
    return this.wrapToObservable(updatePassword, {
      params: [password],
      conditional: { name: 'User', value: this.fireAuth.currentUser },
    });
  }

  changeEmail(email: string): Observable<void> {
    return this.wrapToObservable(updateEmail, {
      params: [email],
      conditional: { name: 'User', value: this.fireAuth.currentUser },
    });
  }
  private wrapToObservable(
    callback: Function,
    {
      params = [],
      conditional = { name: '', value: null },
    }: {
      params: string[] | object[];
      conditional: Conditional<unknown, string>;
    }
  ): Observable<void> {
    return new Observable((observer) => {
      let pass = !!conditional.value;
      if (pass) {
        callback(conditional.value, ...params)
          .then(() => {
            observer.next();
            observer.complete();
          })
          .catch((err: Error) => {
            observer.error(err);
          });
      } else {
        observer.error(new Error(`${conditional.name} is not active!`));
      }
    });
  }
}
