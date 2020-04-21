import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {PatientService} from '../../../../services/patient.service';

interface DialogData {
  patientId: number;
}

@Component({
  selector: 'app-dialog-photo',
  templateUrl: './dialog-photo.component.html',
  styleUrls: ['./dialog-photo.component.scss']
})
export class DialogPhotoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogPhotoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, public patientService: PatientService) { }

  ngOnInit() {
    console.log(this.data);
  }

  onUpload(uploadedFile: string) {
    console.log(uploadedFile);
    console.log("patientid : " + this.data.patientId)
    this.patientService.changePatientPicture(uploadedFile, this.data.patientId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
