export interface Patient {
  id: number;
  firstName?: string;
  lastName?: string;
  photo?: string;
  quizzesId: number[];
}
