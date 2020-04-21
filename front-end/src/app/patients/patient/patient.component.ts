import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {Patient} from "../../../models/patient.model";
import {PatientService} from "../../../services/patient.service";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  public nameString: String;

  constructor(private router: Router, public patientService : PatientService) {

  }

  ngOnInit() {
    this.nameString = this.patientService.getNameString(this.patient);
    this.patient.photo = this.patientService.getPhotoUrl(this.patient);
  }

  @Input()
  patient: Patient;

  @Output()
  patientSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
}
