import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PageValues } from './types';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PageManagerService {
  constructor() {}
  private personalData$$: BehaviorSubject<DocumentData> = new BehaviorSubject({});
  private _resumeID = '';
  private resumeData$$: BehaviorSubject<DocumentData> = new BehaviorSubject({});
  private post = new Subject<PageValues>();
  public messenger$ = this.post.asObservable();

  modifyPage(value: PageValues) {
    this.post.next(value)
  }
  get resumeData(): Observable<DocumentData> {
    return this.resumeData$$.asObservable()
  }
  set resumeData(data: DocumentData) {
    this.resumeData$$.next(data);
  }

  set resumeID(id: string) {
    this._resumeID = id;
  }

  get resumeID() {
    return this._resumeID;
  }

  set personalData(data: DocumentData) {
    this.personalData$$.next(data)
  }

  get personalData(): Observable<DocumentData>  {
    return this.personalData$$.asObservable();
  }

}
