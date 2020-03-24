import {Component, ComponentFactoryResolver, Input, OnInit, OnDestroy} from '@angular/core';
import {Quiz} from "../../../models/quiz.model";
import {Question} from "../../../models/question.model";
import {QuizService} from "../../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {QUESTION_ACTOR, QUESTION_ACTORS, QUIZ_LIST} from "../../../mocks/quiz-list.mock";

@Component({
  selector: 'app-quiz-show',
  templateUrl: './quiz-show.component.html',
  styleUrls: ['./quiz-show.component.scss']
})
export class QuizShowComponent implements OnInit {

  QUESTION = 0;
  VOULIEZ_VOUS_DIRE = 1;
  SUPER_BIEN_JOUE = 2;

  quiz: Quiz;
  currentQuestion: Question;
  currentHandleCode = this.QUESTION;
  ended = false;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quizInit(quiz));
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(id);
  }

  toggleNextQuestion(){
    this.currentHandleCode = this.QUESTION;
    if(this.hasNextQuestion()){
     this.currentQuestion = this.quiz.questions.shift();
    }else{
      this.ended = true;
    }
  }

  private quizInit(quiz) {
    this.quiz = quiz;
    this.toggleNextQuestion();
  }

  private hasNextQuestion() {
    return this.quiz.questions.length > 0;
  }

  handleResponse(answer) {
    if(answer.valid){
      this.currentHandleCode = this.SUPER_BIEN_JOUE;
    }else{
      this.currentHandleCode = this.VOULIEZ_VOUS_DIRE;
    }
  }
}
