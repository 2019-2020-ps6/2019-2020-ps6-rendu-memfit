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

  quizId: any;
  patientId: any;
  quiz: Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quizInit(quiz));
  }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('quizReplayId');
    this.quizService.setSelectedQuiz(this.quizId);
    this.patientId = this.route.snapshot.paramMap.get('patientId');
  }

  private quizInit(quiz) {
    this.quiz = quiz;
  }

}
