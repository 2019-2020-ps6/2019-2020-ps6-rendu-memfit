import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  imgURL: string;
}

@Component({
  selector: 'app-image-choice-popup',
  templateUrl: './image-choice-popup.component.html',
  styleUrls: ['./image-choice-popup.component.scss']
})
export class ImageChoicePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageChoicePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onUpload(uploadedFile: string) {
    this.data.imgURL = "http://localhost:9428/api/" + uploadedFile;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
