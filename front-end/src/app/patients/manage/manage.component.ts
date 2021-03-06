import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from "@angular/material";
import {DialogDeleteComponent} from './dialog-delete/dialog-delete.component';
import {ImageChoicePopupComponent} from '../../image-choice-popup/image-choice-popup.component'
import {QuizService} from '../../../services/quiz.service';
import {QuizRecord} from '../../../models/quizrecord.model';
import {formatDate} from '@angular/common';
import {DialogManagementComponent} from "./dialog-management/dialog-management.component";
import {fade} from "../../animations";
import {PatientQuizSelectionComponent} from './patient-quiz-selection/patient-quiz-selection.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  animations: [fade]
})
export class ManageComponent implements OnInit {
  public patientList: Patient[];
  public quizzesRecordList: QuizRecord[] = [];
  patientForm: any;
  indexSelected: number = 0;
  patientSelected: Patient;
  deleteConf: boolean;
  profileImgURL: string;
  lastQuizzPassed: string;
  hasAnHistoric: boolean = true;
  attribuedQuizNb: number = 0;
  private successPercentage: string;

  constructor(
    public formBuilder: FormBuilder,
    public patientService: PatientService,
    private quizService: QuizService,
    private dialogDelete: MatDialog,
    private dialogManagement : MatDialog,
    private dialogPhoto: MatDialog
  ) {
    this.patientService.patients$.subscribe((patients: Patient[]) => {
      this.initPatients(patients);
    });

    this.patientService.patientSelected$.subscribe((patient: Patient) => {
      this.setSelectedPatient(patient);
    });
    this.profileImgURL = "http://localhost:9428/api/uploads/profile_default.png";
    this.deleteConf = false;
    this.patientForm = this.formBuilder.group({
      firstName: ['']
    });
  }

  ngOnInit() {
  }

  addPatient() {
    let patientToCreate: Patient = this.patientForm.getRawValue() as Patient;
    patientToCreate.lastName = " ";
    patientToCreate.quizzesId = [];
    patientToCreate.photo = "https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png";
    patientToCreate.id = Date.now();
    this.patientService.addPatient(patientToCreate);
    this.patientForm.reset();
  }

  onClick(index: number) {
    this.indexSelected = index;
    this.setSelectedPatient(this.patientList[index]);
  }

  deletePatient() {
    if (this.deleteConf) {
      this.patientService.deletePatient(this.patientSelected);
      if (this.indexSelected != 0) this.indexSelected--;
      this.onClick(this.indexSelected);
    }
    this.deleteConf = false;
  }


  // INIT METHODS

  initPatients(patients: Patient[]) {
    this.patientList = patients;
    if (!this.patientSelected && patients != undefined) {
      this.setSelectedPatient(patients[0]);
      // this.patientSelected = patients[0];
    }
  }

  setSelectedPatient(patient: Patient) {
    this.patientSelected = patient;
    this.profileImgURL = this.patientSelected.photo;
    this.attribuedQuizNb = this.patientSelected.quizzesId.length;
    this.quizService.quizRecords$.subscribe((quizRecords: QuizRecord[]) => {
      this.initQuizRecords(quizRecords);
    });
    this.attribuedQuizNb = this.patientSelected.quizzesId.length;
  }


  initQuizRecords(quizzRecords: QuizRecord[]) {
    this.quizzesRecordList = quizzRecords;
    let patientRecords = this.quizService.getPatientRecords(this.patientSelected.id);


    if(patientRecords.length > 0) {
      this.lastQuizzPassed = this.myFormatDate(patientRecords[patientRecords.length - 1].id);
      this.hasAnHistoric = true;
    }else{
      this.lastQuizzPassed = "Aucun quiz réalisé";
      this.hasAnHistoric = false;
    }
    this.successPercentage = this.quizService.getPatientStats(this.patientSelected.id);

  }


  // UTILS METHODS

  patientString(patient: Patient) {
    return this.patientService.getNameString(patient);
  }

  myFormatDate(date: string) {
    return formatDate(date, 'dd/MM/yyyy à HH:mm', 'fr');
  }


  // DIALOGS METHODS

  openDialogDelete(): void {
    const dialogRef = this.dialogDelete.open(DialogDeleteComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteConf = result;
      this.deletePatient();
    });
  }

  openDialogManagement() {
    const dialogRef = this.dialogManagement.open(DialogManagementComponent, {
      width: '70%',
      data: {
        patient: this.patientSelected
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.attribuedQuizNb = this.patientSelected.quizzesId.length;
    });
  }

  openDialogQuizzes(): void {
    const dialogRef = this.dialogPhoto.open(PatientQuizSelectionComponent, {
      width: '600px',
      data: {patient: this.patientSelected}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        let quizzesId: number[] = [];
        for(let q of result) {
          quizzesId.push(q.id);
        }
        this.patientService.setQuizzesToPatient(quizzesId, this.patientSelected);
        this.attribuedQuizNb = this.patientSelected.quizzesId.length;
      }
    });
  }

  openDialogPhoto(): void {
    const dialogRef = this.dialogPhoto.open(ImageChoicePopupComponent, {
      width: '600px',
      data: {profileImgURL: this.profileImgURL}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.profileImgURL = result;
        this.patientService.changePatientPicture(result, this.patientSelected.id);
      }
    });
  }
}
