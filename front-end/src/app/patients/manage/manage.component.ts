import { Component, OnInit } from '@angular/core';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DialogDeleteComponent} from './dialog-delete/dialog-delete.component';
import {DialogPhotoComponent} from './dialog-photo/dialog-photo.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  public patientList: Patient[] = [];
  public patientListObs$: Observable<Patient[]>;
  patientForm: any;
  indexSelected : number = 0;
  patientSelected: Patient;
  deleteConf: boolean;
  profileImgURL: string;

  constructor(public formBuilder: FormBuilder, public patientService: PatientService, private dialogDelete: MatDialog, private dialogPhoto: MatDialog) {
    this.profileImgURL = "http://localhost:9428/api/uploads/profile_default.png";
    this.deleteConf = false;
    this.patientForm = this.formBuilder.group({
      firstName: ['']
    });
    this.patientListObs$ = patientService.patients$;
  }

  async ngOnInit() {
    this.patientService.patients$.subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });
    await new Promise(resolve => setTimeout(resolve, 20));
    this.patientSelected = this.patientList[0];
    this.profileImgURL = this.patientSelected.photo;
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
    this.profileImgURL = this.patientSelected.photo;
  }

  async deletePatient() {
    if (this.deleteConf) {
      this.patientService.deletePatient(this.patientSelected);
      if (this.indexSelected != 0) this.indexSelected--;
      await new Promise(resolve => setTimeout(resolve, 10));
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
      width: '600px',
      data: {profileImgURL : this.profileImgURL}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null) {
        this.profileImgURL = result;
        this.patientService.changePatientPicture(result, this.patientSelected.id);
      }
    });
  }
}
