import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageValues } from './types';

@Injectable({
  providedIn: 'root',
})
export class PageManagerService {
  constructor() {}

  private post = new Subject<PageValues>();
  public messenger$ = this.post.asObservable();

  modifyPage(value: PageValues) {
    this.post.next(value)
  }
}
