import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DrawQuiz } from '../../interfaces/draw-interface';
import { EnumerationQuiz } from '../../interfaces/enumeration.interface';
import {
  IGame,
  IRound,
  GameStateType,
} from '../../interfaces/game-manager.interface';
import { KaraokeQuiz } from '../../interfaces/karaoke.interface';
import { PictoQuiz } from '../../interfaces/picto.interface';
import { PictureQuiz } from '../../interfaces/picture.interface';
import { QuestionQuiz } from '../../interfaces/question.interface';
import { Quiz, QuizType } from '../../interfaces/quiz.interface';
import { ScoreService } from '../../services/score.service';
import { TimerService } from '../../services/timer.service';
import { EnumerationQuizes } from '../../constants/enumerations';
import { DrawQuizes } from '../../constants/draws';
import { QuestionQuizes } from '../../constants/questions';
import { PictoQuizes } from '../../constants/pictos';
import { PictureQuizes } from '../../constants/pictures';

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

  nextButtonText = 'Start Game';

  constructor(
    public timerService: TimerService,
    public scoreService: ScoreService
  ) {
    this.game = {
      rounds: [
        /*{
          title: 'Tu Te Mets Combien_?',
          type: QuizType.Question,
          quizes: QuestionQuizes,
        },*/
        {
          title: 'Connais tu tes Membres_?',
          type: QuizType.Picture,
          quizes: PictureQuizes,
        },
        {
          title: 'Patate Chaude',
          type: QuizType.Enumeration,
          quizes: EnumerationQuizes,
        },
        {
          title: 'Fais Toi une Idee',
          type: QuizType.Picto,
          quizes: PictoQuizes,
        },
        {
          title: 'Dessins a Relais',
          type: QuizType.Draw,
          quizes: DrawQuizes,
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
    this.scoreService.teamGreenScore = 0;
    this.scoreService.teamRedScore = 0;
  };

  // TODO Game State Service
  public next = (): void => {
    if (this.currentGameState$.value === GameStateType.StartGame) {
      this.currentRound$.next(this.game.rounds[0]);
      this.currentGameState$.next(GameStateType.StartRound);
      this.nextButtonText = 'Start Round';
    } else if (this.currentGameState$.value === GameStateType.StartRound) {
      if (this.currentRound$.value) {
        const nextQuiz = this.currentRound$.value.quizes[0];
        this.currentQuiz$.next(nextQuiz);
        this.currentQuestionIndex$.next(0);
        this.currentGameState$.next(GameStateType.Quiz);
        this.nextButtonText = 'Next Question';
        if (nextQuiz.timer) {
          this.timerService.initializeTimer(nextQuiz.timer.seconds);
        }
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

        if (this.currentQuiz$.value.timer) {
          this.timerService.initializeTimer(
            this.currentQuiz$.value.timer.seconds
          );
        }
      } else {
        const currentQuizIndex = this.currentRound$.value.quizes.indexOf(
          this.currentQuiz$.value
        );

        if (currentQuizIndex >= this.currentRound$.value.quizes.length - 1) {
          this.currentGameState$.next(GameStateType.EndRound);
          this.timerService.removeTimer();
          this.nextButtonText = 'Finish Round';
        } else {
          const nextQuiz =
            this.currentRound$.value.quizes[currentQuizIndex + 1];
          this.currentQuiz$.next(nextQuiz);
          this.currentQuestionIndex$.next(0);

          if (nextQuiz.timer) {
            this.timerService.initializeTimer(nextQuiz.timer.seconds);
          }
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
        this.nextButtonText = 'End Game';
      } else {
        this.currentRound$.next(this.game.rounds[currentRoundIndex + 1]);
        this.currentGameState$.next(GameStateType.StartRound);
        this.nextButtonText = 'Start Round';
      }
    } else if (this.currentGameState$.value === GameStateType.EndGame) {
      this.nextButtonText = 'Start Game';
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

  public getCurrentQuizAsPicture = (): PictureQuiz | undefined => {
    if (!this.currentRound$.value) {
      console.log('Checking type of current round, but its value if falsy.');
      return undefined;
    }

    if (!this.currentQuiz$.value) {
      console.log('Checking type of current quiz, but its value if falsy.');
      return undefined;
    }

    if (this.currentRound$.value.type !== QuizType.Picture) {
      return undefined;
    }

    return this.currentQuiz$.value as PictureQuiz;
  };

  public getCurrentQuizAsPicto = (): PictoQuiz | undefined => {
    if (!this.currentRound$.value) {
      console.log('Checking type of current round, but its value if falsy.');
      return undefined;
    }

    if (!this.currentQuiz$.value) {
      console.log('Checking type of current quiz, but its value if falsy.');
      return undefined;
    }

    if (this.currentRound$.value.type !== QuizType.Picto) {
      return undefined;
    }

    return this.currentQuiz$.value as PictoQuiz;
  };

  public getCurrentQuizAsEnumeration = (): EnumerationQuiz | undefined => {
    if (!this.currentRound$.value) {
      console.log('Checking type of current round, but its value if falsy.');
      return undefined;
    }

    if (!this.currentQuiz$.value) {
      console.log('Checking type of current quiz, but its value if falsy.');
      return undefined;
    }

    if (this.currentRound$.value.type !== QuizType.Enumeration) {
      return undefined;
    }

    return this.currentQuiz$.value as EnumerationQuiz;
  };

  public getCurrentQuizAsDraw = (): DrawQuiz | undefined => {
    if (!this.currentRound$.value) {
      console.log('Checking type of current round, but its value if falsy.');
      return undefined;
    }

    if (!this.currentQuiz$.value) {
      console.log('Checking type of current quiz, but its value if falsy.');
      return undefined;
    }

    if (this.currentRound$.value.type !== QuizType.Draw) {
      return undefined;
    }

    return this.currentQuiz$.value as DrawQuiz;
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

  public onRedTeamScoreClick(): void {
    ++this.scoreService.teamRedScore;
  }

  public onRedTeamScoreContext(event: Event): void {
    --this.scoreService.teamRedScore;
    event.preventDefault();
  }

  public onGreenTeamScoreClick(): void {
    ++this.scoreService.teamGreenScore;
  }

  public onGreenTeamScoreContext(event: Event): void {
    --this.scoreService.teamGreenScore;
    event.preventDefault();
  }

  public onTimerClick(): void {
    this.timerService.startTimer();
  }

  public onResetTimerClick(event: Event): void {
    if (!this.currentQuiz$.value) {
      console.log(
        'Tried to reset the timer, but the current quiz is undefined.'
      );
      return;
    }

    if (!this.currentQuiz$.value.timer) {
      console.log('Tried to reset the timer, but the timer is undefined.');
      return;
    }

    this.timerService.initializeTimer(this.currentQuiz$.value.timer.seconds);
    event.preventDefault();
  }
}
