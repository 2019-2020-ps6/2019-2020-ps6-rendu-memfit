import { Component, OnInit } from '@angular/core';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DialogDeleteComponent} from './dialog-delete/dialog-delete.component';
import {DialogPhotoComponent} from './dialog-photo/dialog-photo.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  public patientList: Patient[] = [];
  patientForm: any;
  indexSelected : number;
  patientSelected: Patient;
  deleteConf: boolean;

  constructor(public formBuilder: FormBuilder, public patientService: PatientService, private dialogDelete: MatDialog, private dialogPhoto: MatDialog) {
    this.indexSelected = 0;
    this.deleteConf = false;
    this.patientService.patients$.subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });
    this.patientForm = this.formBuilder.group({
      firstName: ['']
    });
    this.patientSelected = this.patientList[this.indexSelected];
  }

  ngOnInit() {
  }

  addPatient() {
    let patientToCreate: Patient = this.patientForm.getRawValue() as Patient;
    patientToCreate.lastName = " ";
    patientToCreate.quizzesId = [];
    patientToCreate.photo = "https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png";
    patientToCreate.id = Date.now();
    this.patientService.addPatient(patientToCreate);
    this.patientForm.reset();
  }

  onClick(index: number) {
    this.indexSelected = index;
    this.patientSelected = this.patientList[index];
  }

  deletePatient() {
    if(this.deleteConf) {
      this.patientService.deletePatient(this.patientSelected);
      this.indexSelected --;
      this.onClick(this.indexSelected);
    }
    this.deleteConf = false;
  }

  patientString(patient: Patient) {
    return this.patientService.getNameString(patient);
  }

  openDialogDelete(): void {
    const dialogRef = this.dialogDelete.open(DialogDeleteComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteConf = result;
      this.deletePatient();
    });
  }

  openDialogPhoto(): void {
    const dialogRef = this.dialogPhoto.open(DialogPhotoComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
