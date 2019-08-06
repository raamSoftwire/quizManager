export interface Question {
  uid: string;
  text: string;
  correctAnswer: string;
  alternativeAnswer1: string;
  alternativeAnswer2: string;
  alternativeAnswer3?: string;
  alternativeAnswer4?: string;
}
