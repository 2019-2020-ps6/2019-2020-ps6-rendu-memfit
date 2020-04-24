export interface Question {
  id: any;
  image?: string;
  statement: string;
  answers: Answer[];
}

export interface Answer {
  id: any;
  type?: string;
  image?: string;
  statement: string;
  valid: boolean;
}
