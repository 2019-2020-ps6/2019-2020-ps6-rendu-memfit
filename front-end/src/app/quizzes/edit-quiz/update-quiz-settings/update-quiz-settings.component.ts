import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {Patient} from '../../../../models/patient.model';
import {ImageChoicePopupComponent} from '../../../image-choice-popup/image-choice-popup.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from '../../../../services/quiz.service';
import {PatientService} from '../../../../services/patient.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-update-quiz-settings',
  templateUrl: './update-quiz-settings.component.html',
  styleUrls: ['./update-quiz-settings.component.scss']
})
export class UpdateQuizSettingsComponent implements OnInit {

  @Input()
  quiz: Quiz;

  public photoURL: string;
  public updateQuizForm: FormGroup;
  public patientList: Patient[] = [];
  patientId: number;
  selectedP: number;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public patientService: PatientService, private dialogPhoto: MatDialog)
  {
    this.photoURL = "assets/quiz-logo.png";
    this.patientService.patients$.subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });

    this.initializeQuizForm();
  }

  private initializeQuizForm() {
    this.updateQuizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });
  }

  ngOnInit() {
    this.photoURL = this.quiz.image;
  }

  deleteQuiz(){

  }

  updateQuiz() {
    const quizToUpdate: Quiz = this.updateQuizForm.getRawValue() as Quiz
    let change = 0;
    quizToUpdate.id = this.quiz.id;

    if(this.quiz.name != quizToUpdate.name && quizToUpdate.name != ''){
      change++;
    } else {
      quizToUpdate.name = this.quiz.name;
    }

    if(this.quiz.image != this.photoURL && this.photoURL != ''){
      change++;
      quizToUpdate.image = this.photoURL;
    } else {
      quizToUpdate.image = this.quiz.image;
    }

    if(this.quiz.theme != quizToUpdate.theme && quizToUpdate.theme != ''){
      change++;
    } else {
      quizToUpdate.theme = this.quiz.theme;
    }

    if(change > 0){
      this.quizService.updateQuiz(quizToUpdate);
    }

    //TODO Modifier les patients...
  }

  selectPatientSup() {

  }

  syncImg(value: string) {
    if(value == "") {
      this.photoURL = "assets/quiz-logo.png";
    }
    else this.photoURL = value;
  }





  selected(e) {
    this.selectedP = e.target.value.split(" ")[1];
    console.warn(this.selectedP)
  }

  onUpload(uploadedFile: string) {
    this.photoURL = "http://localhost:9428/api/" + uploadedFile;
  }

  openDialogPhoto(): void {
    const dialogRef = this.dialogPhoto.open(ImageChoicePopupComponent, {
      width: '600px',
      data: {profileImgURL: this.photoURL, fromWitchComponent: 'updateQuizSettings'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.photoURL = result;
      }
    });
  }
}
