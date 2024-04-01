import { FireService } from 'src/app/modules/fire/fire-service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resume-documents',
  templateUrl: './resume-documents.component.html',
  styleUrls: ['./resume-documents.component.css'],
})
export class ResumeDocumentsComponent {
  constructor(private fireService: FireService){}
  public modalView = 'header';
  public modalViews = {
    header: 'header',
    contacts: 'contacts',
    skills: 'skills',
    softSkills: 'softSkills',
  };

  submitHandler(form: NgForm) {
    console.log(form.value);
    const path = this.modalView;
    const data = form.value;
    this.fireService.saveUserData(data, path).subscribe(() => {
      console.log('data saved from observer!');
    })

  }



}
