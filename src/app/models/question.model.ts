export interface Question {
  questionText: string;
  options: {
    text: string;
    correct?: boolean;
  }[];
  explanation: string;
}
