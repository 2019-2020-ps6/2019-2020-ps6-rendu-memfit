import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
