import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  interval,
  Subject,
  takeUntil,
  timer,
} from 'rxjs';
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

@Component({
  selector: 'mihyle-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss'],
})
export class GameManagerComponent {
  private game: IGame;

  isTimerActive = false;
  timer: number | undefined | null = undefined;
  timerEnds$: Subject<void> | undefined | null = undefined;

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
        imageUrl: 'https://picsum.photos/200?random=1',
        title: 'Title Question 1',
        questions: [
          'The question 1.1',
          'The question 1.2',
          'The question 1.3',
          'The question 1.4',
          'The question 1.5',
          'The question 1.6',
          'The question 1.7',
          'The question 1.8',
          'The question 1.9',
          'The question 1.10',
        ],
        answers: [
          'The answer 1.1',
          'The answer 1.2',
          'The answer 1.3',
          'The answer 1.4',
          'The answer 1.5',
          'The answer 1.6',
          'The answer 1.7',
          'The answer 1.8',
          'The answer 1.9',
          'The answer 1.10',
        ],
      },
      {
        imageUrl: 'https://picsum.photos/200?random=2',
        title: 'Title Question 2',
        questions: [
          'The question 2.1',
          'The question 2.2',
          'The question 2.3',
          'The question 2.4',
          'The question 2.5',
          'The question 2.6',
          'The question 2.7',
          'The question 2.8',
          'The question 2.9',
          'The question 2.10',
        ],
        answers: [
          'The answer 2.1',
          'The answer 2.2',
          'The answer 2.3',
          'The answer 2.4',
          'The answer 2.5',
          'The answer 2.6',
          'The answer 2.7',
          'The answer 2.8',
          'The answer 2.9',
          'The answer 2.10',
        ],
      },
    ];

    const karaokeQuizes: KaraokeQuiz[] = [
      {
        imageUrl: 'https://picsum.photos/200?random=4',
        title: 'Title Karaoke 1',
        youtubeVideoId: 'E05SSymMvdY',
        timestampsSeconds: [3, 5, 10, 160],
        questions: [
          '______ ____ _______',
          '______ ____ _______ ______',
          '______ ____ _______ _______ ________',
          'Enjoy the rest of the song !',
        ],
        answers: [
          'Solution 1.1',
          'Solution 1.2',
          'Solution 1.3',
          'Enjoy the rest of the song !',
        ],
      },
      {
        imageUrl: 'https://picsum.photos/200?random=5',
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

    const pictureQuizes: PictureQuiz[] = [
      {
        imageUrl: 'https://picsum.photos/200?random=6',
        title: 'Title Picture 1',
        questions: ['The picture 1'],
        answers: ['The answer picture 1'],
        pictureUrl: 'https://picsum.photos/200/300?random=7',
      },
      {
        imageUrl: 'https://picsum.photos/200?random=8',
        title: 'Title Picture 2',
        questions: ['The picture 2'],
        answers: ['The answer picture 2'],
        pictureUrl: 'https://picsum.photos/200/300?random=9',
      },
      {
        imageUrl: 'https://picsum.photos/200?random=10',
        title: 'Title Picture 3',
        questions: ['The picture 3'],
        answers: ['The answer picture 3'],
        pictureUrl: 'https://picsum.photos/200/300?random=11',
      },
    ];

    const pictoQuizes: PictoQuiz[] = [
      {
        imageUrl: 'https://picsum.photos/200?random=12',
        title: 'Title Picture 1',
        questions: ['The picture 1'],
        answers: ['The answer picture 1'],
        pictosUrl: [
          'https://picsum.photos/200/300?random=13',
          'https://picsum.photos/200/300?random=14',
        ],
      },
      {
        imageUrl: 'https://picsum.photos/200?random=15',
        title: 'Title Picture 2',
        questions: ['The picture 2'],
        answers: ['The answer picture 2'],
        pictosUrl: [
          'https://picsum.photos/200/300?random=16',
          'https://picsum.photos/200/300?random=17',
          'https://picsum.photos/200/300?random=18',
        ],
      },
      {
        imageUrl: 'https://picsum.photos/200?random=19',
        title: 'Title Picture 3',
        questions: ['The picture 3'],
        answers: ['The answer picture 3'],
        pictosUrl: [
          'https://picsum.photos/200/300?random=20',
          'https://picsum.photos/200/300?random=21',
          'https://picsum.photos/200/300?random=22',
          'https://picsum.photos/200/300?random=23',
        ],
      },
    ];

    const enumerationQuizes: EnumerationQuiz[] = [
      {
        imageUrl: 'https://picsum.photos/200?random=6',
        title: 'Title Picture 1',
        questions: ['The picture 1'],
        answers: ['The answer picture 1'],
      },
      {
        imageUrl: 'https://picsum.photos/200?random=8',
        title: 'Title Picture 2',
        questions: ['The picture 2'],
        answers: ['The answer picture 2'],
      },
      {
        imageUrl: 'https://picsum.photos/200?random=10',
        title: 'Title Picture 3',
        questions: ['The picture 3'],
        answers: ['The answer picture 3'],
      },
    ];

    const drawQuizes: DrawQuiz[] = [
      {
        imageUrl: 'https://picsum.photos/200?random=11',
        title: 'Title Draw 1',
        questions: ['The draw 1'],
        answers: ['The draw picture 1'],
      },
      {
        imageUrl: 'https://picsum.photos/200?random=12',
        title: 'Title Draw 2',
        questions: ['The draw 2'],
        answers: ['The draw picture 2'],
      },
      {
        imageUrl: 'https://picsum.photos/200?random=13',
        title: 'Title Draw 3',
        questions: ['The draw 3'],
        answers: ['The draw picture 3'],
      },
    ];

    this.game = {
      rounds: [
        {
          title: 'Simple Questions!',
          type: QuizType.Question,
          quizes: questionQuizes,
          timer: {
            seconds: 20,
            autoStart: false,
            goNextIndexOnTimerEnds: false,
            goNextQuestionOnTimerEnds: false,
            failOnTimerEnds: true,
          },
        },
        /*{
          title: 'Simple Karaokes!',
          type: QuizType.Karaoke,
          quizes: karaokeQuizes,
        },*/
        /*{
          title: 'Simple Pictures',
          type: QuizType.Picture,
          quizes: pictureQuizes,
        },*/
        /*{
          title: 'Simple Pictos',
          type: QuizType.Picto,
          quizes: pictoQuizes,
        },*/
        /*{
          title: 'Simple Enumeration',
          type: QuizType.Enumeration,
          quizes: enumerationQuizes,
        },*/
        /*{
          title: 'Simple Draw',
          type: QuizType.Draw,
          quizes: drawQuizes,
        },*/
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

  private startTimer(): void {
    if (!this.timer) {
      console.log('Trying to start timer, but timer is undefined.');

      return;
    }

    if (!this.timerEnds$) {
      console.log('Trying to start timer, but timer end is undefined.');

      return;
    }

    interval(1000)
      .pipe(takeUntil(this.timerEnds$))
      .subscribe(() => {
        if (!this.timer) {
          console.log('Timer passed in the subscribe, but timer is undefined.');
          return;
        }

        this.isTimerActive = true;
        --this.timer;

        if (this.timer === 0) {
          if (!this.timerEnds$) {
            console.log(
              'Tried to end the timer, but the timerEnds subject is undefined.'
            );
            return;
          }

          this.timerEnds$.next();
          this.timerEnds$.complete();
          this.timer = null;
          this.timerEnds$ = null;
          this.isTimerActive = false;
        }
      });
  }

  private initializeTimer(seconds: number): void {
    this.timer = seconds;

    if (this.timerEnds$) {
      this.timerEnds$.next();
      this.timerEnds$.complete();
      this.isTimerActive = false;
    }

    this.timerEnds$ = new Subject<void>();
  }

  // TODO Game State Service
  public OnClickNext = (): void => {
    if (this.currentGameState$.value === GameStateType.StartGame) {
      this.currentRound$.next(this.game.rounds[0]);
      this.currentGameState$.next(GameStateType.StartRound);
    } else if (this.currentGameState$.value === GameStateType.StartRound) {
      if (this.currentRound$.value) {
        this.currentQuiz$.next(this.currentRound$.value.quizes[0]);
        this.currentQuestionIndex$.next(0);
        this.currentGameState$.next(GameStateType.Quiz);
        console.log('Next Quiz ! ');
        this.initializeTimer(this.currentRound$.value.timer.seconds);
        if (this.currentRound$.value.timer.autoStart) {
          this.startTimer();
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
        this.initializeTimer(this.currentRound$.value.timer.seconds);
        if (this.currentRound$.value.timer.autoStart) {
          this.startTimer();
        }
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

  public onTimerClick(): void {
    if (!this.currentRound$.value) {
      console.log(
        'Tried to start the timer, but the current round is undefined.'
      );
      return;
    }

    if (!this.isTimerActive) {
      this.startTimer();
    }
  }
}
