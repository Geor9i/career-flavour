import { Component, inject } from '@angular/core';
import { Firestore, collection, getDoc, addDoc } from '@angular/fire/firestore';
import { FireService } from '../fire-service.service';
@Component({
  selector: 'app-test-read',
  templateUrl: './test-read.component.html',
  styleUrls: ['./test-read.component.css']
})
export class TestReadComponent {

  constructor() {}
    private firestore: Firestore = inject(Firestore)
    testCollection = collection(this.firestore, 'test');
    fireservice = inject(FireService);
  read() {
    this.fireservice.getData().subscribe(testData => {
      console.log(testData);

    })
  }

  write() {
    addDoc(this.testCollection, {
      test2: 'I Just saved some Data!'
    })
    .then(() => console.log('Data Saved!'))
  }
}
