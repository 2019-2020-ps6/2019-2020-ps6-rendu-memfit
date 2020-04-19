import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  public photoURL: string;
  public quizForm: FormGroup;
  public patientList: Patient[] = [];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public patientService: PatientService, private router: Router) {
    this.photoURL = "assets/quiz-logo.png";
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
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
    this.quizService.addQuiz(quizToCreate);
    this.router.navigate(['/quiz/edit/' + dateNow]);
  }

  selectPatientSup() {
    alert('Fonction en cours d\'implémentation.');
  }

  syncImg(value: string) {
    if(value == "") {
      this.photoURL = "assets/quiz-logo.png";
    }
    else this.photoURL = value;
  }
}
