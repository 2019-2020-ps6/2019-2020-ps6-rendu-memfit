import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import {ImageChoicePopupComponent} from '../../image-choice-popup/image-choice-popup.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})

export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  inQuestionEditing: EventEmitter<boolean> = new EventEmitter();

  inEdit = true;
  public questionForm: FormGroup;
  panelOpenState = false;
  photoURL = 'assets/question-logo.png'
  photoURLAnswers: Array<string> = new Array<string>();
  witchAnswerIsEdited = 0;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private dialogPhoto: MatDialog) {
    // Form creation
    this.initializeQuestionForm();
    this.inQuestionEditing.emit(this.inEdit);
  }

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
    this.photoURLAnswers.push('assets/question-logo.png')
  }

  deleteAnswer(id) {
    this.answers.removeAt(id);
    this.photoURLAnswers.splice(id, 1);
  }

  addQuestion() {
    const question = this.questionForm.getRawValue() as Question;
    let dateNow = Date.now();
    question.id = dateNow;
    question.image = this.photoURL;
    console.log(question);
    let indexQuestion = 0;
    question.answers.forEach(answerToCheck => {
      dateNow = Date.now();
      answerToCheck.id = dateNow;
      if (answerToCheck.image === '') {
        answerToCheck.image = this.photoURLAnswers[indexQuestion];
      }
      indexQuestion++;
      });
    this.quizService.addQuestion(this.quiz, question);
    this.initializeQuestionForm();
    this.inEdit = false;
    this.inQuestionEditing.emit(this.inEdit);
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
    this.inEdit = false;
    this.inQuestionEditing.emit(this.inEdit);
    const dialogRef = this.dialogPhoto.open(ImageChoicePopupComponent, {
      width: '600px',
      data: {profileImgURL: this.photoURL}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.photoURL = result;
      }
      this.inEdit = true;
      this.inQuestionEditing.emit(this.inEdit);
    });
  }

  witchAnswer(id) {
    this.witchAnswerIsEdited = id;
    this.openDialogPhotoAnswers();
  }

  syncImgAnswers(value: string) {
    if(value == "") {
      this.photoURLAnswers[this.witchAnswerIsEdited] = "assets/quiz-logo.png";
    }
    else this.photoURLAnswers[this.witchAnswerIsEdited] = value;
  }

  onUploadAnswers(uploadedFile: string) {
    this.photoURLAnswers[this.witchAnswerIsEdited] = "http://localhost:9428/api/" + uploadedFile;
  }

  openDialogPhotoAnswers(): void {
    const dialogRef = this.dialogPhoto.open(ImageChoicePopupComponent, {
      width: '600px',
      data: {profileImgURL: this.photoURLAnswers[this.witchAnswerIsEdited]}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.photoURLAnswers[this.witchAnswerIsEdited] = result;
      }
    });
  }
}
