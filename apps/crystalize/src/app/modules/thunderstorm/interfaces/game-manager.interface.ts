import { Quiz, QuizType } from './quiz.interface';
import { ITimer } from './timer.interface';

export interface IGame {
  rounds: IRound[];
}

export interface IRound {
  title: string;
  type: QuizType;
  quizes: Quiz[];
  timer: ITimer;
}

export enum GameStateType {
  StartGame,
  StartRound,
  Quiz,
  EndRound,
  EndGame,
}
