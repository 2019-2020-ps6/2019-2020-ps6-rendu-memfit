import {Component, Inject, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

export interface DialogData {
  quiz: Quiz;
}

@Component({
  selector: 'app-pop-up-delete-quiz',
  templateUrl: './pop-up-delete-quiz.component.html',
  styleUrls: ['./pop-up-delete-quiz.component.scss']
})
export class PopUpDeleteQuizComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopUpDeleteQuizComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router)
  {

  }

  ngOnInit() {
  }

  deleteNo() {
    this.dialogRef.close();
  }

  deleteYes() {
    this.router.navigate(['/quiz/edit/' + this.data.quiz.id]);
  }

}
