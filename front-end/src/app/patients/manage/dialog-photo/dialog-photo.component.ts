import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

interface DialogData {
  confirmation: boolean;
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
  }

  onUpload(dzdz: string) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
