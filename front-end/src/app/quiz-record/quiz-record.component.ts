import {Component, OnInit} from '@angular/core';
import {QuizRecord} from "../../models/quizrecord.model";
import {PatientService} from "../../services/patient.service";
import {ActivatedRoute} from "@angular/router";
import {Patient} from "../../models/patient.model";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-quiz-record',
  templateUrl: './quiz-record.component.html',
  styleUrls: ['./quiz-record.component.scss']
})
export class QuizRecordComponent implements OnInit {
  patientId: any;
  private patient: Patient;


  quizRecords: QuizRecord[];

  constructor(private route: ActivatedRoute, private patientService: PatientService, private quizService: QuizService) {
    this.patientService.patientSelected$.subscribe((patient) => this.updatePatient(patient));
  }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.quizService.setQuizRecordsFromUrl();
    this.patientService.setSelectedPatient(this.patientId);
  };


  private quizListRecordsUpdate(quizs: QuizRecord[]) {
    this.quizRecords = this.quizService.getPatientRecords(this.patientId);
  }

  private updatePatient(patient: Patient) {
    this.patient = patient;
    this.quizService.quizRecords$.subscribe((quizs) => this.quizListRecordsUpdate(quizs));
  }

}
