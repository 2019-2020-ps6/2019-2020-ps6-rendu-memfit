import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../../../models/quiz.model";
import {Router} from "@angular/router";
import {startWith} from "rxjs/operators";

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {

  public option : string;

  constructor(private router: Router) {
    if(this.router.url.includes("launch")) {
      this.option = "launch";
    }
    if(this.router.url.includes("update")) {
      this.option = "update";
    }
  }

  ngOnInit() {
  }

  @Input()
  patientId : number;

  @Input()
  quiz: Quiz;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

}
