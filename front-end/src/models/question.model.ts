export interface Answer {
    type?: string;
    statement: string;
    valid: boolean;
}

export interface Question {
    id: string;
    statement: string;
    answers: Answer[];
}
