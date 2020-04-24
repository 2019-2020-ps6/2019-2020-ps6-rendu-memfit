import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import {Answer, Question} from 'src/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  questionToUpdateForNewAnswer: Question;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  updateQuestionEmit(questionToUpdate: Question) {
    this.quizService.updateQuestion(this.quiz, questionToUpdate);
  }

  questionContainsTheNewAnswerEmit(questionToUpdate: Question){
    this.questionToUpdateForNewAnswer = questionToUpdate;
  }

  updateAnswerEmit(answerToUpdate: Answer) {
    if(this.questionToUpdateForNewAnswer != null){
      this.quizService.updateAnswer(this.quiz, this.questionToUpdateForNewAnswer, answerToUpdate);
    }
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);
  }

}
