import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  profileImgURL: string;
}

@Component({
  selector: 'app-dialog-photo',
  templateUrl: './dialog-photo.component.html',
  styleUrls: ['./dialog-photo.component.scss']
})
export class DialogPhotoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogPhotoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    console.log(this.data);
  }

  onUpload(uploadedFile: string) {
    this.data.profileImgURL = "http://localhost:9428/api/" + uploadedFile;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
