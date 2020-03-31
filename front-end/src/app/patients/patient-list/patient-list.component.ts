import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../../models/patient.model';
import { PatientService } from '../../../services/patient.service'

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  public patientList: Patient[] = [];

  constructor(private router: Router, public patientService: PatientService) {
    this.patientService.patients$.subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });
  }

  ngOnInit() {
  }
}
