import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Answer, Question} from '../../../models/question.model';
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

  @Output()
  updateQuestionEmit: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  updateAnswerEmit: EventEmitter<Answer> = new EventEmitter<Answer>();

  @Output()
  questionContainsTheNewAnswerEmit: EventEmitter<Question> = new EventEmitter<Question>();


  public questionStatementForm: FormGroup;
  public answerStatementForm: FormGroup;
  panelOpenState = false;
  editQuestionStatement = false;
  editAnswerStatement = false;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
    this.initializeAnswerForm();
  }

  private initializeQuestionForm() {
    this.questionStatementForm = this.formBuilder.group({
      statement: [''],
    });
  }

  private initializeAnswerForm() {
    this.answerStatementForm = this.formBuilder.group({
      statement: [''],
    });
  }

  ngOnInit() {
  }

  editQuestionStatementFCT() {
    this.editQuestionStatement = true;
  }

  savingEditQuestionStatementFCT() {
    this.updateQuestion();
    this.editQuestionStatement = false;
  }

  editAnswerStatementFCT() {
    this.editAnswerStatement = true;
  }

  savingEditAnswerStatementFCT(index:number) {
    this.updateAnswer(index);
    this.editAnswerStatement = false;
  }

  updateQuestion() {
    const newStatement = this.questionStatementForm.value['statement'] as string;
    if(!(newStatement == '')){
      this.question.statement = newStatement;
      this.updateQuestionEmit.emit(this.question);
    }
  }

  updateAnswer(index:number) {
    const newStatement = this.answerStatementForm.value['statement'] as string;
    if(!(newStatement == '')){
      this.question.answers[index].statement = newStatement;
      this.questionContainsTheNewAnswerEmit.emit(this.question);
      this.updateAnswerEmit.emit(this.question.answers[index]);
    }
  }

  delete() {
    this.deleteQuestion.emit(this.question);
  }

}
