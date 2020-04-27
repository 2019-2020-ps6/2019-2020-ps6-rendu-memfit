import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';
import {MatDialog} from '@angular/material';
import {ImageChoicePopupComponent} from '../../image-choice-popup/image-choice-popup.component';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  public photoURL: string;
  public quizForm: any;
  public patientList: Patient[] = [];
  patientId: number;

  selectedPatients: Patient[];

  constructor(
    public formBuilder: FormBuilder,
    public quizService: QuizService,
    public patientService: PatientService,
    private router: Router,
    private dialogPhoto: MatDialog,
  ) {
    this.photoURL = "assets/quiz-logo.png";
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
    });
    this.patientService.patients$.subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });
  }

  ngOnInit() {
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    const dateNow = Date.now();
    quizToCreate.id = dateNow;
    quizToCreate.image = this.photoURL;
    this.quizService.addQuiz(quizToCreate);
    for(let p of this.selectedPatients) {
      this.patientService.addQuizToPatient(dateNow, p);
    }
    this.router.navigate(['/quiz/edit/' + dateNow]);
  }

  openDialogPhoto(): void {
    const dialogRef = this.dialogPhoto.open(ImageChoicePopupComponent, {
      width: '600px',
      data: {profileImgURL: this.photoURL}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.photoURL = result;
      }
    });
  }

  onNgModelChange(event){
    console.log(this.selectedPatients)
    console.log('on ng model change', event);
  }
}
