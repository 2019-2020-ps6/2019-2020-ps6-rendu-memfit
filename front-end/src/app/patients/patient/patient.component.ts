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

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  @Input()
  patient: Patient;

  @Output()
  patientSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

    selectPatient(patient: Patient) {
    this.router.navigate(['/patients/' + patient.id]);
    this.patientSelected.emit(true);
  }
}
