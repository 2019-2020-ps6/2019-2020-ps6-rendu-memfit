import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Answer, Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { AnswerRecord, QuizRecord } from '../models/quizrecord.model';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  private quizUrl = serverUrl + '/quizzes';
  private quizRecordUrl = serverUrl + '/quizRecord';
  private questionsPath = 'questions';
  private answersPath = 'answers';

  private httpOptions = httpOptionsBase;

  private quizRecords: QuizRecord[] = [];

  public quizRecords$: BehaviorSubject<QuizRecord[]> = new BehaviorSubject(this.quizRecords);

  public quizRecordSelected$: Subject<QuizRecord> = new Subject();
  private quizRecordPath = 'quizRecord';


  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
    this.setQuizRecordsFromUrl();
  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  updateQuiz(quiz: Quiz){

    this.http.put<Quiz>(this.quizUrl + '/' + quiz.id, { 'id':quiz.id, 'name':quiz.name, 'theme':quiz.theme, 'image':quiz.image }, this.httpOptions).subscribe();
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  addAnswer(quiz: Quiz, question: Question, answer: Answer) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath;
    this.http.post<Answer>(answerUrl, answer, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  updateQuestion(quiz: Quiz, question: Question){
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.put<Quiz>(questionUrl, question, this.httpOptions).subscribe();
  }

  updateAnswer(quiz: Quiz, question: Question, answer: Answer){
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answer.id;
    this.http.put<Quiz>(answerUrl, answer, this.httpOptions).subscribe();
  }

  deleteAnswer(quiz: Quiz, question: Question, answer: Answer) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answer.id;
    this.http.delete<Answer>(answerUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  setQuizRecordsFromUrl() {
    this.http.get<QuizRecord[]>(this.quizRecordUrl).subscribe((quizRecordList) => {
      this.quizRecords = quizRecordList;
      this.quizRecords$.next(this.quizRecords);
    });
  }

  getPatientRecords(patientId: number) {
    return this.quizRecords.filter(quizRecord => quizRecord.patientId == patientId);
  }

  getPatientStats(patientId: number){
    let records = this.getPatientRecords(patientId);

    let validatedQuestions = 0;
    let totalQuestions = 0;
    for(let record of records){
      for(let answerRecord of record.records){
        if(answerRecord.correct || (!answerRecord.correct && answerRecord.rectified)){
          validatedQuestions++;
        }
        totalQuestions++;
      }
    }

    return totalQuestions == 0 ? "Aucune statistique" : ((validatedQuestions/totalQuestions)*100).toFixed(1)+"%";
  }

  startQuizRecord(quizRecord: QuizRecord) {
    const recordUrl = this.quizRecordUrl;
    this.http.post<QuizRecord>(recordUrl, quizRecord, this.httpOptions).subscribe(() => this.setQuizRecordsFromUrl());
  }

  addAnswerRecord(quizRecord: QuizRecord, answerRecord: AnswerRecord) {
    const answerUrl = this.quizRecordUrl + '/' + quizRecord.id + '/answerrecord';
    this.http.post<Question>(answerUrl, answerRecord, this.httpOptions).subscribe(() => this.setSelectedQuizRecord(quizRecord.id));
  }

  setSelectedQuizRecord(quizRecordId: string) {
    const urlWithId = this.quizRecordUrl + '/' + quizRecordId;
    this.http.get<QuizRecord>(urlWithId).subscribe((quizRecord) => {
      this.quizRecordSelected$.next(quizRecord);
    });
  }


}

