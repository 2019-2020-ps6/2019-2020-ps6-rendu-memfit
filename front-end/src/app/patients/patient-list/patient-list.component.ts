import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Patient } from '../../../models/patient.model';
import { PatientService } from '../../../services/patient.service'
import {fade} from "../../animations";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  animations: [
  fade
  ]
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

  @Input()
  com: number;
}
