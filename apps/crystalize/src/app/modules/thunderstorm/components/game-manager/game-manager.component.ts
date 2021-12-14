import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  IGame,
  IRound,
  GameStateType,
} from '../../interfaces/game-manager.interface';
import { KaraokeQuiz } from '../../interfaces/karaoke.interface';
import { QuestionQuiz } from '../../interfaces/question.interface';
import { Quiz, QuizType } from '../../interfaces/quiz.interface';

@Component({
  selector: 'mihyle-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss'],
})
export class GameManagerComponent {
  private game: IGame;

  currentGameState$: BehaviorSubject<GameStateType> =
    new BehaviorSubject<GameStateType>(GameStateType.StartGame);

  currentRound$: BehaviorSubject<IRound | undefined | null> =
    new BehaviorSubject<IRound | undefined | null>(undefined);

  currentQuiz$: BehaviorSubject<Quiz | undefined | null> = new BehaviorSubject<
    Quiz | undefined | null
  >(undefined);

  currentQuestionIndex$: BehaviorSubject<number | undefined | null> =
    new BehaviorSubject<number | undefined | null>(undefined);

  constructor() {
    const questionQuizes: QuestionQuiz[] = [
      {
        imageUrl: 'http://imageURL.com',
        title: 'Title Question 1',
        questions: ['The question 1'],
        answers: ['The answer 1'],
      },
      {
        imageUrl: 'http://imageURL.com',
        title: 'Title Question 2',
        questions: ['The question 2'],
        answers: ['The answer 2'],
      },
      {
        imageUrl: 'http://imageURL.com',
        title: 'Title Question 3',
        questions: ['The question 3'],
        answers: ['The answer 3'],
      },
    ];

    const karaokeQuizes: KaraokeQuiz[] = [
      {
        imageUrl: 'http://imageURL.com',
        title: 'Title Karaoke 1',
        youtubeVideoId: 'E05SSymMvdY',
        timestampsSeconds: [3, 5, 10],
        questions: [
          '______ ____ _______',
          '______ ____ _______ ______',
          '______ ____ _______ _______ ________',
        ],
        answers: ['Solution 1.1', 'Solution 1.2', 'Solution 1.3'],
      },
      {
        imageUrl: 'http://imageURL.com',
        title: 'Title Karaoke 2',
        youtubeVideoId: 'woFTMwLJilI',
        timestampsSeconds: [5, 10, 12],
        questions: [
          '______ ____ _______ _______ ______ ______ _____',
          '______ ____ _______ _______ ______ ______ _____ ______',
          '______ ____ _______ _______ ______ ______ _____ ______ _______',
        ],
        answers: ['Solution 2.1', 'Solution 2.2', 'Solution 2.3'],
      },
    ];

    this.game = {
      rounds: [
        /*{
          title: 'Simple Questions!',
          type: QuizType.Question,
          quizes: questionQuizes,
        },*/
        {
          title: 'Simple Karaoke!',
          type: QuizType.Karaoke,
          quizes: karaokeQuizes,
        },
      ],
    };

    this.initializeGame();
  }

  private initializeGame = (): void => {
    this.currentGameState$.next(GameStateType.StartGame);
    this.currentRound$.next(null);
    this.currentQuiz$.next(null);
    this.currentQuestionIndex$.next(null);
  };

  // TODO Game State Service
  OnClickNext = (): void => {
    if (this.currentGameState$.value === GameStateType.StartGame) {
      this.currentRound$.next(this.game.rounds[0]);
      this.currentGameState$.next(GameStateType.StartRound);
    } else if (this.currentGameState$.value === GameStateType.StartRound) {
      if (this.currentRound$.value) {
        this.currentQuiz$.next(this.currentRound$.value.quizes[0]);
        this.currentQuestionIndex$.next(0);
        this.currentGameState$.next(GameStateType.Quiz);
      } else {
        console.log(
          'The game was in a RoundState, but the current round was empty.'
        );
        return;
      }
    } else if (this.currentGameState$.value === GameStateType.Quiz) {
      if (!this.currentRound$.value) {
        console.log(
          'The game was in a QuizState, but the current round was empty.'
        );
        return;
      }

      if (!this.currentQuiz$.value) {
        console.log(
          'The game was in a QuizState, but the current quiz was empty.'
        );
        return;
      }

      if (
        this.currentQuestionIndex$.value === undefined ||
        this.currentQuestionIndex$.value === null
      ) {
        console.log("The currentQuestionIndex doesn't have any value.");
        return;
      }

      if (!this.currentQuiz$.value.questions) {
        console.log('The current quiz does not have any questions in it.');
        return;
      }

      if (
        this.currentQuestionIndex$.value <
        this.currentQuiz$.value.questions.length - 1
      ) {
        this.currentQuestionIndex$.next(this.currentQuestionIndex$.value + 1);
      } else {
        const currentQuizIndex = this.currentRound$.value.quizes.indexOf(
          this.currentQuiz$.value
        );

        if (currentQuizIndex >= this.currentRound$.value.quizes.length - 1) {
          this.currentGameState$.next(GameStateType.EndRound);
        } else {
          this.currentQuiz$.next(
            this.currentRound$.value.quizes[currentQuizIndex + 1]
          );
          this.currentQuestionIndex$.next(0);
        }
      }
    } else if (this.currentGameState$.value === GameStateType.EndRound) {
      if (!this.currentRound$.value) {
        console.log(
          'The game was in a EndRoundState, but the current round was empty.'
        );
        return;
      }

      const currentRoundIndex = this.game.rounds.indexOf(
        this.currentRound$.value
      );

      if (currentRoundIndex >= this.game.rounds.length - 1) {
        this.currentGameState$.next(GameStateType.EndGame);
      } else {
        this.currentRound$.next(this.game.rounds[currentRoundIndex + 1]);
        this.currentGameState$.next(GameStateType.StartRound);
      }
    } else if (this.currentGameState$.value === GameStateType.EndGame) {
      this.initializeGame();
    }
  };

  public getCurrentQuizAsQuestion = (): QuestionQuiz | undefined => {
    if (!this.currentRound$.value) {
      console.log('Checking type of current round, but its value if falsy.');
      return undefined;
    }

    if (!this.currentQuiz$.value) {
      console.log('Checking type of current quiz, but its value if falsy.');
      return undefined;
    }

    if (this.currentRound$.value.type !== QuizType.Question) {
      return undefined;
    }

    return this.currentQuiz$.value as QuestionQuiz;
  };

  public getCurrentQuizAsKaraoke = (): KaraokeQuiz | undefined => {
    if (!this.currentRound$.value) {
      console.log('Checking type of current round, but its value if falsy.');
      return undefined;
    }

    if (!this.currentQuiz$.value) {
      console.log('Checking type of current quiz, but its value if falsy.');
      return undefined;
    }

    if (this.currentRound$.value.type !== QuizType.Karaoke) {
      return undefined;
    }

    return this.currentQuiz$.value as KaraokeQuiz;
  };

  public isCurrentGameStartState = (): boolean => {
    return this.currentGameState$.value === GameStateType.StartGame;
  };

  public isCurrentGameStartRoundState = (): boolean => {
    return this.currentGameState$.value === GameStateType.StartRound;
  };

  public isCurrentGameQuizState = (): boolean => {
    return this.currentGameState$.value === GameStateType.Quiz;
  };

  public isCurrentGameEndRoundState = (): boolean => {
    return this.currentGameState$.value === GameStateType.EndRound;
  };

  public isCurrentGameEndGameState = (): boolean => {
    return this.currentGameState$.value === GameStateType.EndGame;
  };
}
