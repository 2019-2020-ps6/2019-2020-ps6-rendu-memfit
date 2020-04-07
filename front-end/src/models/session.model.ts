import {Question} from './question.model';

export interface Session {
  id: any;
  quizzId: any;
  patientId: any;
  questionId: any;
  reponseId: any;
  rectification: boolean;
}
