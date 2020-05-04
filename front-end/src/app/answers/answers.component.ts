import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../models/question.model";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  @Input()
  answer: Answer;

  constructor() {
  }

  ngOnInit() {
  }

}
