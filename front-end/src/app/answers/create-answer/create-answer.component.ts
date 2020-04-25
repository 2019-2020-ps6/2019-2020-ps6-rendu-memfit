import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {MatDialog} from '@angular/material';
import {Answer, Question} from '../../../models/question.model';
import {ImageChoicePopupComponent} from '../../image-choice-popup/image-choice-popup.component';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.scss']
})
export class CreateAnswerComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Input()
  questionId: number;

  question: Question;
  public answerForm: FormGroup;
  panelOpenState = false;
  photoURLAnswer = 'assets/question-logo.png'

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private dialogPhoto: MatDialog) {
    // Form creation
    this.initializeAnswerForm();
  }

  private initializeAnswerForm() {
    this.answerForm = this.formBuilder.group({
      statement: [''],
      image: [''],
      valid: false,
    });
  }

  ngOnInit() {
    this.quiz.questions.forEach(questionToChange => {
      if(questionToChange.id == this.questionId){
        this.question = questionToChange;
        console.log(this.question);
      }
    });
  }

  addAnswer() {
    this.quiz.questions.forEach(questionToChange => {
      console.log(questionToChange.id);
      console.log(this.questionId);
      if(questionToChange.id == this.questionId){
        this.question = questionToChange;
        console.log(this.question);
      }
    });

    const answer = this.answerForm.getRawValue() as Answer;
    let dateNow = Date.now();
    answer.id = dateNow;
    answer.image = this.photoURLAnswer;
    if (answer.image === '') {
      answer.image = this.photoURLAnswer;
    }
    this.quizService.addAnswer(this.quiz, this.question, answer);
    this.initializeAnswerForm();
  }

  syncImgAnswer(value: string) {
    if(value == "") {
      this.photoURLAnswer = "assets/quiz-logo.png";
    }
    else this.photoURLAnswer = value;
  }

  onUploadAnswer(uploadedFile: string) {
    this.photoURLAnswer = "http://localhost:9428/api/" + uploadedFile;
  }

  openDialogPhotoAnswer(): void {
    const dialogRef = this.dialogPhoto.open(ImageChoicePopupComponent, {
      width: '600px',
      data: {profileImgURL: this.photoURLAnswer, fromWitchComponent: 'createAnswer'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.photoURLAnswer = result;
      }
    });
  }

}
