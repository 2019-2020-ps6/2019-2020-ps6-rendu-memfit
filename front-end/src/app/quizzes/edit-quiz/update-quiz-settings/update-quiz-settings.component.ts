import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';

@Component({
  selector: 'app-update-quiz-settings',
  templateUrl: './update-quiz-settings.component.html',
  styleUrls: ['./update-quiz-settings.component.scss']
})
export class UpdateQuizSettingsComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor() { }

  ngOnInit() {
  }

}
