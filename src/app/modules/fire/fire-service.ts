import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FireService {
  private firestore = inject(Firestore);
  constructor() {
  }

  testCollection = collection(this.firestore, 'test');

  getData<T>() {
    return collectionData(this.testCollection) as Observable<T[]>;
  }

}
