import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Patient } from '../models/patient.model';
import { PATIENT_LIST } from '../mocks/patient-list.mock';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Quiz} from "../models/quiz.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patients: Patient[] = PATIENT_LIST;

  /**
   * Observable which contains the list of the patients.
   */
  public patients$: BehaviorSubject<Patient[]>
    = new BehaviorSubject(this.patients);

  public patientSelected$: Subject<Patient> = new Subject();

  private httpOptions = httpOptionsBase;
  private patientUrl = serverUrl + '/quizzes';


  constructor(private http: HttpClient) {
    this.setPatientsFromUrl();
  }

  setPatientsFromUrl() {
    this.http.get<Patient[]>(this.patientUrl).subscribe((quizList) => {
      this.patients = quizList;
      this.patients$.next(this.patients);
    });
  }

}