import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Answer, Question} from '../../../models/question.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {ImageChoicePopupComponent} from '../../image-choice-popup/image-choice-popup.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Input()
  quiz: Quiz;

  @Input()
  indexQuestion: number;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  answerDelete: EventEmitter<Answer> = new EventEmitter<Answer>();

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
  questionToUpdateWithNewAnswer: Question;
  photoURL: string;
  photoURLAnswers: string;
  witchAnswerIsEdited = 0;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private dialogPhoto: MatDialog) {
    // Form creation
    this.initializeQuestionForm();
    this.initializeAnswerForm();
  }

  private initializeQuestionForm() {
    this.questionStatementForm = this.formBuilder.group({
      statement: [''],
      image: ['']
    });
  }

  private initializeAnswerForm() {
    this.answerStatementForm = this.formBuilder.group({
      statement: [''],
      image: [''],
      valid: false
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

    if(!(this.photoURL == '')){
      this.question.image = this.photoURL;
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

    if(!(this.photoURLAnswers == '')){
      this.question.answers[index].image = this.photoURLAnswers;
      this.updateAnswerEmit.emit(this.question.answers[index]);
    }

    const newValid = this.answerStatementForm.value['valid'] as boolean;
    if(newValid != this.question.answers[index].valid){
      this.question.answers[index].valid = newValid;
      this.updateAnswerEmit.emit(this.question.answers[index]);
    }
  }

  deleteAnswer(index:number) {
    this.questionContainsTheNewAnswerEmit.emit(this.question);
    this.answerDelete.emit(this.question.answers[index]);
  }

  delete() {
    this.deleteQuestion.emit(this.question);
  }

  openDialogPhotoQuestion(): void {
    const dialogRef = this.dialogPhoto.open(ImageChoicePopupComponent, {
      width: '600px',
      data: {profileImgURL: this.photoURL}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.photoURL = result;
      }
    });
  }

  witchAnswer(id) {
    this.witchAnswerIsEdited = id;
    this.openDialogPhotoAnswers();
  }

  openDialogPhotoAnswers(): void {
    const dialogRef = this.dialogPhoto.open(ImageChoicePopupComponent, {
      width: '600px',
      data: {profileImgURL: this.photoURLAnswers}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.photoURLAnswers = result;
      }
    });
  }

}
