import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Patient } from '../models/patient.model';
import { PATIENT_LIST } from '../mocks/patient-list.mock';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patients: Patient[] = PATIENT_LIST;

  /**
   * Observable which contains the list of the patients.
   */
  public patients$: BehaviorSubject<Patient[]> = new BehaviorSubject(this.patients);

  public patientSelected$: Subject<Patient> = new Subject();

  private httpOptions = httpOptionsBase;
  private patientUrl = serverUrl + '/patients';


  constructor(private http: HttpClient) {
    this.setPatientsFromUrl();
  }

  setPatientsFromUrl() {
    this.http.get<Patient[]>(this.patientUrl).subscribe((patientList) => {
      this.patients = patientList;
      this.patients$.next(this.patients);
    });
  }

  getNameString(patient: Patient) {
    let nameString = "";

    if(patient.firstName == undefined && patient.lastName == undefined) nameString = patient.id;
    else if(patient.firstName == undefined && patient.lastName != undefined) nameString = patient.lastName;
    else if(patient.firstName != undefined && patient.lastName == undefined) nameString = patient.firstName;
    else nameString = patient.firstName + " " + patient.lastName;

    return nameString;
  }

  getPhotoUrl(patient: Patient) {
    if(patient.photo == undefined) {
      return  "https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png";
    }
    else return patient.photo;
  }

  public addPatient(patient: Patient) {
    this.http.post<Patient>(this.patientUrl, patient, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }

  public deletePatient(patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id;
    this.http.delete<Patient>(urlWithId, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }

  addQuizToPatient(quizId: number, patientId: number) {
    const patientUrl = this.patientUrl + '/' + patientId + '/addQuiz/' + quizId;
    this.http.post<Patient>(patientUrl, this.httpOptions).subscribe();
  }
}
