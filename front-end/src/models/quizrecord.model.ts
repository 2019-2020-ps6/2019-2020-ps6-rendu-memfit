export class QuizRecord {
  id: any;
  name: string;
  theme?: string;
  records: AnswerRecord[];
  patientId: number;
}

export class AnswerRecord {
  id: any;
  quizRecordId: number;
  question: string;
  answer: string;
  correct: boolean;
  rectified?: boolean;
}
