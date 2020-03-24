import { Question } from './question.model';

export interface Quiz {
    id: string;
    name: string;
    patientId: string;
    theme?: string;
    questions: Question[];
}
