import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from "../../models/question.model";
import {Quiz} from "../../models/quiz.model";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  @Input()
  answer: Answer;

  @Output() nextQuestionEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
