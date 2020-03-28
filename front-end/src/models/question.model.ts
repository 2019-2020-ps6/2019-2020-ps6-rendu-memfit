export interface Question {
  id: any;
  statement: string;
  answers: Answer[];
}

export interface Answer {
  type?: string;
  statement: string;
  valid: boolean;
}
