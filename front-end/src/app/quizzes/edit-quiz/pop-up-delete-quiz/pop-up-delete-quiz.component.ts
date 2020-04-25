import {Component, Inject, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import { QuizService } from '../../../../services/quiz.service';
import {PatientService} from '../../../../services/patient.service';
import {Patient} from '../../../../models/patient.model';

export interface DialogData {
  quiz: Quiz;
}

@Component({
  selector: 'app-pop-up-delete-quiz',
  templateUrl: './pop-up-delete-quiz.component.html',
  styleUrls: ['./pop-up-delete-quiz.component.scss']
})
export class PopUpDeleteQuizComponent implements OnInit {

  public patientList: Patient[] = [];
  patientId: number;

  constructor(public dialogRef: MatDialogRef<PopUpDeleteQuizComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private router: Router, public quizService: QuizService,
              public patientService: PatientService)
  {
    this.patientService.patients$.subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });
  }

  ngOnInit() {
  }

  deleteNo() {
    this.dialogRef.close();
  }

  deleteYes() {
    this.patientList.forEach(patientToDelete => {
      this.patientService.removeQuizToPatient(this.data.quiz.id, patientToDelete.id);
    });

    this.data.quiz.questions.forEach(answersAndQuestionsTodelete => {
      answersAndQuestionsTodelete.answers.forEach(answerToDelete => {
        this.quizService.deleteAnswer(this.data.quiz, answersAndQuestionsTodelete, answerToDelete);
      });
      this.quizService.deleteQuestion(this.data.quiz, answersAndQuestionsTodelete);
    });

    this.quizService.deleteQuiz(this.data.quiz);

    this.router.navigate(['/']);
    this.dialogRef.close();
  }

}
