import {Component, OnInit} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {Question} from "../../../models/question.model";
import {QuizRecord, AnswerRecord} from "../../../models/quizrecord.model";
import {QuizService} from "../../../services/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {fade} from "../../animations";

@Component({
  selector: 'app-quiz-show',
  templateUrl: './quiz-show.component.html',
  styleUrls: ['./quiz-show.component.scss'],
  animations: [
    fade
  ]
})
export class QuizShowComponent implements OnInit {

  QUESTION = 0;
  VOULIEZ_VOUS_DIRE = 1;
  SUPER_BIEN_JOUE = 2;

  quiz: Quiz;
  currentQuestion: Question;

  currentHandleCode = this.QUESTION;
  started = false;
  ended = false;

  // Track user choices in a quiz
  quizRecord: QuizRecord;
  answerRecord: AnswerRecord = null;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quizInit(quiz));
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(id);
  }

  private quizInit(quiz) {
    this.quiz = quiz;
  }

  toggleNextQuestion() {
    if (!this.started) {
      this.started = true;

      this.quizRecord = new QuizRecord();
      this.quizRecord.id =  Date.now();
      this.quizRecord.name = this.quiz.name;
      this.quizRecord.patientId = parseInt(this.route.snapshot.paramMap.get('patientId'));

      this.quizService.startQuizRecord(this.quizRecord);
    }

    this.currentHandleCode = this.QUESTION;
    if (this.hasNextQuestion()) {
      this.currentQuestion = this.quiz.questions.shift();

      this.answerRecord = new AnswerRecord();
      this.answerRecord.id = Date.now();
      this.answerRecord.quizRecordId = this.quizRecord.id;
      this.answerRecord.question = this.currentQuestion.statement;
    } else {
      this.ended = true;
    }
  }

  private hasNextQuestion() {
    return this.getRemainingQuestion() > 0;
  }

  private getRemainingQuestion(){
    return this.quiz.questions.length;
  }


  handleResponse(answer) {
    this.answerRecord.answer = answer.statement;
    this.answerRecord.correct = answer.valid;
    if (answer.valid) {
      this.quizService.addAnswerRecord(this.quizRecord, this.answerRecord); // Answer right, send it to SERVER
      if(this.getRemainingQuestion() >= 1) {
        this.currentHandleCode = this.SUPER_BIEN_JOUE;
      }else{
        this.ended = true;
      }
    } else {
      this.currentHandleCode = this.VOULIEZ_VOUS_DIRE;
    }
  }

  handleCorrection(acceptedCorrection){
    if(acceptedCorrection){ // He accepted that his answer was wrong
      this.answerRecord.rectified = true;
    }else{
      this.answerRecord.rectified = false;
    }

    this.quizService.addAnswerRecord(this.quizRecord, this.answerRecord); // Answer was not right, add rectify information!

    this.toggleNextQuestion(); // Then, we go to the next question !
  }
}
