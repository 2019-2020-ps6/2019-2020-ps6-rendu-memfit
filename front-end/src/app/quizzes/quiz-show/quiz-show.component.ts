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

  public quiz: Quiz;
  public currentQuestion: Question;
  vouliezVousDire: boolean = false;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quizInit(quiz));
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(id);
  }

  toggleNextQuestion(){
    this.vouliezVousDire = false;
    if(this.hasNextQuestion()){
     this.currentQuestion = this.quiz.questions.shift();
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
      this.toggleNextQuestion();
    }else{
      this.vouliezVousDire = true;
    }
  }
}
