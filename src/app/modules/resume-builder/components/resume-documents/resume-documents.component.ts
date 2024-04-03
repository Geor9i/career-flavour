import { PageManagerService } from './../../page-manager.service';
import { FireService } from 'src/app/modules/fire/fire-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-resume-documents',
  templateUrl: './resume-documents.component.html',
  styleUrls: ['./resume-documents.component.css'],
})
export class ResumeDocumentsComponent implements OnInit, OnDestroy {
  constructor(private fireService: FireService, private pageManagerService: PageManagerService){}
  private pageManagerSubscription!: Subscription;
  public modalView = 'header';
  public modalViews = {
    header: 'header',
    contacts: 'contacts',
    skills: 'skills',
    softSkills: 'softSkills',
  };
  public personal: DocumentData = {};

ngOnInit(): void {
  this.pageManagerSubscription = this.pageManagerService.personalData.subscribe(data => {
    if (data) {
      this.personal = data;
      console.log('this.personal', this.personal);

    }
  })
}

  submitHandler(form: NgForm) {
    const path = `personal.${this.modalView}`;
    const data = form.value;
    this.fireService.saveToDB(data, path).subscribe(() => {
    })
  }

ngOnDestroy(): void {
  this.pageManagerSubscription.unsubscribe();
}

}
