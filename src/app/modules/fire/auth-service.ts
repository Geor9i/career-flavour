import { Injectable, inject } from "@angular/core";
import { Auth, EmailAuthProvider, User, UserCredential, createUserWithEmailAndPassword, deleteUser, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "@angular/fire/auth";
import { BehaviorSubject, Observable, from } from "rxjs";
import { UserInterface, UserRegisterInterface } from "../user/types/user.interface";
import { Conditional } from './types/interfaces';

@Injectable
({
  providedIn: 'root'
})


export class AuthService{
  private fireAuth = inject(Auth);
  private authSubject$$ = new BehaviorSubject(this.fireAuth.currentUser)
  private userData = this.fireAuth.currentUser;

  constructor(){
    this.fireAuth.onAuthStateChanged(user => {
      this.authSubject$$.next(user);
    });
  }

  get userObservable$() {
    return this.authSubject$$.asObservable();
  }

  get user() {
    return this.userData
  }

  set user(user: User | null) {
      this.userData = user;
      this.authSubject$$.next(user)
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }


  get auth () {
    return this.fireAuth;
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
        const credential = EmailAuthProvider.credential(
          userData.email,
          userData.password
        );
        reauthenticateWithCredential(this.fireAuth.currentUser, credential)
          .then(() => {
            observer.next();
            observer.complete();
          })
          .catch((err: Error) => {
            observer.error(err);
          });
      } else {
        signInWithEmailAndPassword(
          this.fireAuth,
          userData.email,
          userData.password
        )
          .then(() => {
            observer.next();
            observer.complete();
          })
          .catch((err: Error) => {
            observer.error(err);
          });
      }
    });
  }

  resetPassword(email: string): Observable<void> {
    return new Observable<void>((observer) => {
      if (!this.fireAuth.currentUser) {
        sendPasswordResetEmail(this.fireAuth, email)
          .then(() => {
            observer.next();
            observer.complete();
          })
          .catch((err: Error) => {
            observer.error(err);
          });
      } else {
        observer.error(new Error('No user is currently logged in.'));
      }
    });
  }

  deleteAccount() {
    if (this.fireAuth.currentUser) {
      deleteUser(this.fireAuth.currentUser);
    }
  }

  logout() {
    return signOut(this.fireAuth);
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
