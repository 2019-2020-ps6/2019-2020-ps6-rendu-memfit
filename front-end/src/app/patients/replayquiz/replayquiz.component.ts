import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-replayquiz',
  templateUrl: './replayquiz.component.html',
  styleUrls: ['./replayquiz.component.scss']
})
export class ReplayquizComponent implements OnInit {

  quiz: Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quizInit(quiz));
  }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(quizId);
    const patientId = this.route.snapshot.paramMap.get('quizReplayId');
  }

  private quizInit(quiz) {
    this.quiz = quiz;
  }

}
