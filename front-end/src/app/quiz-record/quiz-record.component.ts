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
  quizRecords: QuizRecord[];

  patientId: any;
  private patient: Patient;


  private quisRecords: QuizRecord[];

  constructor(private route: ActivatedRoute, private patientService: PatientService, private quizService: QuizService) {

    this.patientService.patients$.subscribe((patients) => this.updatePatients(patients));
    this.quizService.quizRecords$.subscribe((quizs) => this.quizListRecordsUpdate(quizs));
  }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
  };


  private quizListRecordsUpdate(quizs: QuizRecord[]) {
    this.quisRecords = quizs;
    this.quizRecords = this.quizService.getPatientRecords(this.patientId);
  }

  private updatePatients(patients: Patient[]) {
    this.patient = this.patientService.getPatient(this.patientId);
  }
}
