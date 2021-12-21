import { ITimer } from './timer.interface';

export class Quiz {
  title: string | undefined = undefined;
  questions: string[] | undefined = undefined;
  answers: string[] | undefined = undefined;
  timer: ITimer | undefined = undefined;
}

export enum QuizType {
  Question,
  Karaoke,
  Picture,
  Picto,
  Enumeration,
  Draw,
}
