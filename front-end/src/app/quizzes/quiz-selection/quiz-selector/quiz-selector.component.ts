import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../../models/quiz.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PatientService} from "../../../../services/patient.service";
import {Patient} from "../../../../models/patient.model";
import {QuizService} from "../../../../services/quiz.service";

@Component({
  selector: 'app-quiz-selecter',
  templateUrl: './quiz-selector.component.html',
  styleUrls: ['./quiz-selector.component.scss']
})
export class QuizSelectorComponent implements OnInit {

  routeParams: Params;
  public patientId: number = null;
  public patientStringName: string;

  public patient: Patient = null;
  public quizList: Quiz[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public quizService: QuizService, public patientService: PatientService) {
    //we get the patient id from the url
    this.activatedRoute.params.subscribe( params => {
      this.routeParams = params;
    });
    this.patientId = this.routeParams.patientId;

    //then we get the patient object from the PatientService
    this.patientService.patients$.subscribe((patients: Patient[]) => {
      this.patient = patients.filter(patient => patient.id == this.patientId)[0];
    });

    //then we set up his display name with PatientService
    this.patientStringName = this.patientService.getNameString(this.patient);

    //TODO get patient(patientId) and get quizzes form it
    // .filter(quiz => this.patient.quizzesId.includes(quiz.id))

    //we get the quizzes
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes.filter(quiz => this.patient.quizzesId.includes(quiz.id));
    });
  }

  ngOnInit(): void {
  }
}
