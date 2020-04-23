import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Patient} from "../../../../models/patient.model";
import {PatientService} from "../../../../services/patient.service";

interface DialogData {
  confirmation: boolean;
}

@Component({
  selector: 'dialog-management.component',
  templateUrl: './dialog-management.component.html',
  styleUrls: ['./dialog-management.component.scss']
})
export class DialogManagementComponent implements OnInit {

  public patient: Patient;

  constructor(
    public patientService : PatientService,
    public dialogRef: MatDialogRef<DialogManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.patient = this.patientService.getPatient(this.data);
  }

  ngOnInit() {
  }
}



