import { Quiz, QuizType } from './quiz.interface';

export interface IGame {
  rounds: IRound[];
}

export interface IRound {
  title: string;
  type: QuizType;
  quizes: Quiz[];
  timer: ITimer;
}

export interface ITimer {
  seconds: number;
  goNextIndexOnTimerEnds: boolean;
  goNextQuestionOnTimerEnds: boolean;
  failOnTimerEnds: boolean;
  autoStart: boolean;
}

export enum GameStateType {
  StartGame,
  StartRound,
  Quiz,
  EndRound,
  EndGame,
}
