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
    const path = `personal.${this.modalView}`;
    const data = form.value;
    this.fireService.saveToDB(data, path).subscribe(() => {
    })
  }
}
