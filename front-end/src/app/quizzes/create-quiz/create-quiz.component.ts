import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  public quizForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });
  }

  ngOnInit() {
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    const dateNow = Date.now();
    quizToCreate.id = dateNow;
    this.quizService.addQuiz(quizToCreate);
    this.router.navigate(['/edit-quiz/' + dateNow]);
  }

  selectPatientSup() {
    alert('Fonction en cours d\'implémentation.');
  }
}
