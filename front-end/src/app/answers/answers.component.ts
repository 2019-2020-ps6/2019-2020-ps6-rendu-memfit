import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from "../../models/question.model";
import {Quiz} from "../../models/quiz.model";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  @Input()
  answer: Answer;

  constructor(private imgService: ImageService) {
  }

  ngOnInit() {
  }

}
