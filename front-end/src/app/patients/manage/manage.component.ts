import { Component, OnInit } from '@angular/core';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';
import {FormBuilder} from '@angular/forms';

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

  constructor(public formBuilder: FormBuilder, public patientService: PatientService) {
    this.indexSelected = 0;
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
    this.patientService.deletePatient(this.patientSelected);
    this.indexSelected --;
    this.onClick(this.indexSelected);
  }

  patientString(patient: Patient) {
    return this.patientService.getNameString(patient);
  }
}
