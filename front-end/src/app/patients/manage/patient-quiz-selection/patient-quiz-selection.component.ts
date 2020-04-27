import {Component, Inject, OnInit} from '@angular/core';
import {Patient} from '../../../../models/patient.model';
import {QuizService} from '../../../../services/quiz.service';
import {PatientService} from '../../../../services/patient.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Quiz} from '../../../../models/quiz.model';

interface DialogData {
  patient: Patient;
}

@Component({
  selector: 'app-patient-quiz-selection',
  templateUrl: './patient-quiz-selection.component.html',
  styleUrls: ['./patient-quiz-selection.component.scss']
})
export class PatientQuizSelectionComponent implements OnInit {

  selectedQuizzes: Quiz[];
  quizzes: Quiz[];
  patient: Patient;

  constructor(
    public quizService: QuizService,
    public patientService: PatientService,
    public dialogRef: MatDialogRef<PatientQuizSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizzes = quizzes;
    });
    this.patient = data.patient;
  }

  ngOnInit() {
    this.selectedQuizzes = this.quizzes.filter(quiz => this.patient.quizzesId.includes(quiz.id));
  }

  onNgModelChange($event: any) {
    console.log('on ng model change', event);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
