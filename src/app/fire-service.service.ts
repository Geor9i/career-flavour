import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FireService {
  firestore = inject(Firestore);
  testCollection = collection(this.firestore, 'test');

  getData<T>() {
    return collectionData(this.testCollection) as Observable<T[]>
  }
}
