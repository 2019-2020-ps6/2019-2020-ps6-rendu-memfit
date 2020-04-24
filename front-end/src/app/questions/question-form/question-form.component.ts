import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import {ImageChoicePopupComponent} from '../../image-choice-popup/image-choice-popup.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})

export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  modalCreateQuestion = null;
  public questionForm: FormGroup;
  panelOpenState = false;
  photoURL = 'assets/question-logo.png'
  photoURLAnswers = 'assets/question-logo.png'


  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private dialogPhoto: MatDialog) {
    // Form creation
    this.initializeQuestionForm();
  }

  bindModal(modal) {this.modalCreateQuestion = modal;}

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      statement: [''],
      image: [''],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit() {
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      statement: [''],
      image: [''],
      valid: false,
    });
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  deleteAnswer(id) {
    this.answers.removeAt(id);
  }

  addQuestion() {
    const question = this.questionForm.getRawValue() as Question;
    const dateNow = Date.now();
    question.id = dateNow;
    question.image = this.photoURL;
    console.log(question);
    question.answers.forEach(answerToCheck => {
      if (answerToCheck.image === '') {
        answerToCheck.image = this.photoURLAnswers;
      }
      });
    this.quizService.addQuestion(this.quiz, question);
    this.initializeQuestionForm();
  }

  syncImgQuestion(value: string) {
    if(value == "") {
      this.photoURL = "assets/quiz-logo.png";
    }
    else this.photoURL = value;
  }

  onUploadQuestion(uploadedFile: string) {
    this.photoURL = "http://localhost:9428/api/" + uploadedFile;
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

      this.modalCreateQuestion = document.getElementById("createQuestion");
      this.modalCreateQuestion.className = 'modal fade show';

    });
  }

  syncImgAnswers(value: string) {
    if(value == "") {
      this.photoURLAnswers = "assets/quiz-logo.png";
    }
    else this.photoURLAnswers = value;
  }

  onUploadAnswers(uploadedFile: string) {
    this.photoURLAnswers = "http://localhost:9428/api/" + uploadedFile;
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

      this.modalCreateQuestion = document.getElementById("createQuestion");
      this.modalCreateQuestion.className = 'modal fade show';

    });
  }
}
