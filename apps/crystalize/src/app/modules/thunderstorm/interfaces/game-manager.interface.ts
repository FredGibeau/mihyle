import { Quiz, QuizType } from './quiz.interface';

export interface IGame {
  rounds: IRound[];
}

export interface IRound {
  title: string;
  type: QuizType;
  quizes: Quiz[];
}

export enum GameStateType {
  StartGame,
  StartRound,
  Quiz,
  EndRound,
  EndGame,
}
