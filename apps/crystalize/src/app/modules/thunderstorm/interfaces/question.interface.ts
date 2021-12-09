export interface QuestionCard {
  question: Question;
  answer: Answer;
}

interface Question {
  question: string;
  title: string;
  imageUrl: string;
}

interface Answer {
  answer: string;
  title: string;
  imageUrl: string;
}
