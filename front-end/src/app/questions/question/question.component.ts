import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Input()
  indexQuestion: number;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();


  public questionStatementForm: FormGroup;
  panelOpenState = false;
  editQuestionStatement = false;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionStatementForm = this.formBuilder.group({
      statement: ['']
    });
  }

  ngOnInit() {
  }

  editQuestionStatementFCT() {
    this.editQuestionStatement = true;
  }

  savingEditQuestionStatementFCT() {
  this.editQuestionStatement = false;
}

  delete() {
    this.deleteQuestion.emit(this.question);
  }

}
