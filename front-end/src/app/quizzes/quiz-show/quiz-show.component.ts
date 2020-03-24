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

  public quiz: Quiz = QUIZ_LIST[1];
  currentQuestion: Question;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    // this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(id);
    this.toggleNextQuestion();
  }

  toggleNextQuestion(){
    // console.log(this.currentQuestion);
    if(this.quiz.questions.length > 0){
     this.currentQuestion = this.quiz.questions.pop();
      console.log(this.currentQuestion);
    }
  }
}
