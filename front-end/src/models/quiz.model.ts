import { Question } from './question.model';

export interface Quiz {
    id: any;
    name: string;
    theme?: string;
    questions: Question[];
}
