import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Patient} from "../../../../models/patient.model";
import {PatientService} from "../../../../services/patient.service";
import {Quiz} from "../../../../models/quiz.model";
import {QuizService} from "../../../../services/quiz.service";
import {FormControl} from "@angular/forms";

interface DialogData {
  patient: Patient;
}

@Component({
  selector: 'dialog-management.component',
  templateUrl: './dialog-management.component.html',
  styleUrls: ['./dialog-management.component.scss']
})
export class DialogManagementComponent implements OnInit {

  public patient: Patient;
  public quizzesId: number[];

  public quizzesToAdd: Quiz[];
  public patientQuizzes: Quiz[];


  public quizIdToAdd :any;
  selectChangeHandler (event: any) {
    //update the ui
    this.quizIdToAdd = event.target.value;
  }

  constructor(
    public quizService: QuizService,
    public patientService: PatientService,
    public dialogRef: MatDialogRef<DialogManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.patient = this.data.patient;
    this.quizzesId = this.patient.quizzesId;
    this.refreshLists();
  }

  ngOnInit() {
  }

  refreshLists() {
    //first we refresh the patient
    this.patient = this.patientService.getPatient(this.patient.id);
    //we set the quizzes of the patient
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.patientQuizzes = quizzes.filter(quiz => this.patient.quizzesId.includes(quiz.id));
    });
    //we set the quizzes that the patient could add to his profile
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizzesToAdd = quizzes.filter(quiz => !this.patient.quizzesId.includes(quiz.id));
    });
  }

  deleteQuizToPatient(quizId: number) {
    //we remove the quiz of the patient's quiz list
    this.patientService.removeQuizToPatient(quizId, this.patient.id);
    //then we update the lists
    this.refreshLists();
  }

  addQuizToPatient(quizId: number) {
    if(this.quizIdToAdd != undefined) {
      //we add the quiz of the patient's quiz list
      this.patientService.addQuizToPatient(quizId, this.data.patient);
      //then we update the lists
      this.refreshLists();
    }
  }
}



