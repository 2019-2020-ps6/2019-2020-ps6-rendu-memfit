import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {Patient} from "../../../models/patient.model";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  public nameString: String;
  public photoUrl: String;

  constructor(private router: Router) {

  }

  ngOnInit() {
    if(this.patient.firstName == undefined && this.patient.lastName == undefined) this.nameString = this.patient.id;
    else if(this.patient.firstName == undefined && this.patient.lastName != undefined) this.nameString = this.patient.lastName;
    else if(this.patient.firstName != undefined && this.patient.lastName == undefined) this.nameString = this.patient.firstName;
    else this.nameString = this.patient.firstName + " " + this.patient.lastName;

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
