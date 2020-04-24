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
  public patientId: number;
  public patientStringName: string;

  public patient: Patient = null;
  public quizList: Quiz[] = [];

  public option: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public quizService: QuizService, public patientService: PatientService) {
    //we get the patient id from the url
    this.activatedRoute.params.subscribe( params => {
      this.routeParams = params;
    });

    //then we get the patient object from the PatientService
    this.patientService.patientSelected$.subscribe(patient => {
      this.setPatient(patient);
    })

    //then we set up his display name with PatientService

    //we get the quizzes

    //we set the option of the selector from the url
    if(this.router.url.includes("launch")) {
      this.option = "launch";
    }
    if(this.router.url.includes("update")) {
      this.option = "update";
    }
  }

  ngOnInit(): void {
    this.patientId = this.routeParams.patientId;
    this.patientService.setSelectedPatient(this.patientId.toString());
  }

  private setPatient(patient: Patient) {
    this.patient = patient;
    this.patientStringName = this.patientService.getNameString(this.patient);
    this.patient.photo = this.patientService.getPhotoUrl(this.patient);
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes.filter(quiz => this.patient.quizzesId.includes(quiz.id));
    });
  }
}
