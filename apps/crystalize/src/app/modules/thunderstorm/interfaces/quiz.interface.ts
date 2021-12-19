export class Quiz {
  title: string | undefined = undefined;
  imageUrl: string | undefined = undefined;
  questions: string[] | undefined = undefined;
  answers: string[] | undefined = undefined;
}

export enum QuizType {
  Question,
  Karaoke,
  Picture,
  Picto,
}
