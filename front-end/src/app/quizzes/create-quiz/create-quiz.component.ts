import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  public quizForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      quizName: [''],
      quizTheme: [''],
      patientId: ['']
    });
  }

  ngOnInit() {
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    this.quizService.addQuiz(quizToCreate);
  }
}
