
export class QuizRecord {
    id: any;
    patientId: any;
    name: string;
    theme?: string;
    // records: AnswerRecord[]
    ;
}

export class AnswerRecord {
  id: any;
  quizRecordId: any;
  question: string;
  answer: string;
  correct: boolean;
  rectified?: boolean;
}
