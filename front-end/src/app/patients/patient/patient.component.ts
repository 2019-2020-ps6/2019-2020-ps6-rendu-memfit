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
  public photoUrl: String;

  constructor(private router: Router, public patientService : PatientService) {

  }

  ngOnInit() {
    this.nameString = this.patientService.getNameString(this.patient);

    if(this.patient.photo == undefined) {
      this.photoUrl = "https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png";
    }
    else this.photoUrl = this.patient.photo;
  }

  @Input()
  patient: Patient;

  @Output()
  patientSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
}
