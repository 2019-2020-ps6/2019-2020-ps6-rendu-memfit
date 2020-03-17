import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient} from "../../../models/patient.model";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  patient: Patient;

  @Output()
  patientSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectPatient() {
    this.patientSelected.emit(true);
  }
}
