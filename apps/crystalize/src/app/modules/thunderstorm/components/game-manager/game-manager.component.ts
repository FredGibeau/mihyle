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

@Component({
  selector: 'mihyle-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss'],
})
export class GameManagerComponent {
  private readonly googleDriveBase =
    'https://drive.google.com/uc?export=view&id=';

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
    const questionQuizes: QuestionQuiz[] = [
      {
        timer: { seconds: 20 },
        title: 'Title Question 1',
        questions: [
          '',
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
          '',
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
        timer: { seconds: 20 },
        title: 'Title Question 2',
        questions: [
          '',
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
          '',
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
        timer: { seconds: 20 },
        title: 'Title Karaoke 1',
        youtubeVideoId: 'E05SSymMvdY',
        timestampsSeconds: [3, 5, 10, 160],
        questions: [
          '_________ ____ _______',
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
        timer: { seconds: 20 },
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
        timer: { seconds: 20 },
        title: 'Title Picture 1',
        questions: [''],
        answers: ['The answer picture 1'],
        pictureUrl: 'https://picsum.photos/200/300?random=7',
      },
      {
        timer: { seconds: 20 },
        title: 'Title Picture 2',
        questions: [''],
        answers: ['The answer picture 2'],
        pictureUrl: 'https://picsum.photos/200/300?random=9',
      },
      {
        timer: { seconds: 20 },
        title: 'Title Picture 3',
        questions: [''],
        answers: ['The answer picture 3'],
        pictureUrl: 'https://picsum.photos/200/300?random=11',
      },
    ];

    const pictoQuizes: PictoQuiz[] = [
      {
        timer: { seconds: 20 },
        title: 'Personnage',
        questions: [],
        answers: ['Adam et Eve'],
        pictosUrl: [this.googleDriveBase + '16Y3Tnmf5dk0qydqgMNe7-luEdkaKJhm7'],
      },
      {
        timer: { seconds: 20 },
        title: 'Oeuvre',
        questions: [],
        answers: ['Alice aux Pays des Merveilles'],
        pictosUrl: [this.googleDriveBase + '19ZeJZr_FXw2JI7UrRcCm0sQ4qKPveNFc'],
      },
      {
        timer: { seconds: 20 },
        title: 'Phenomene',
        questions: [''],
        answers: ['Arc en ciel'],
        pictosUrl: [this.googleDriveBase + '17oXrOEDMvx_RetzaRxSmvD8csCQ9oPGE'],
      },
      {
        timer: { seconds: 20 },
        title: 'Chanson',
        questions: [''],
        answers: ['Au Clair de la Lune'],
        pictosUrl: [this.googleDriveBase + '1F7PXoHpt3PXAvmZGE4jZIZoU_BQ9feOW'],
      },
      {
        timer: { seconds: 20 },
        title: 'Expression',
        questions: [''],
        answers: ['Au plus fort de la poche'],
        pictosUrl: [this.googleDriveBase + '1Wvt6K63ZzKK3fkKL-6insiENIOVoAT_c'],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
      {
        timer: { seconds: 20 },
        title: '',
        questions: [''],
        answers: [''],
        pictosUrl: [this.googleDriveBase + ''],
      },
    ];

    const enumerationQuizes: EnumerationQuiz[] = [
      {
        timer: { seconds: 20 },
        title: 'Title Picture 1',
        questions: [''],
        answers: [''],
      },
      {
        timer: { seconds: 20 },
        title: 'Title Picture 2',
        questions: [''],
        answers: [''],
      },
      {
        timer: { seconds: 20 },
        title: 'Title Picture 3',
        questions: [''],
        answers: [''],
      },
    ];

    const drawQuizes: DrawQuiz[] = [
      {
        timer: { seconds: 20 },
        title: 'Title Draw 1',
        questions: [],
        answers: [],
      },
      {
        timer: { seconds: 20 },
        title: 'Title Draw 2',
        questions: [],
        answers: [],
      },
      {
        timer: { seconds: 20 },
        title: 'Title Draw 3',
        questions: [],
        answers: [],
      },
    ];

    this.game = {
      rounds: [
        /*{
          title: 'Simple Questions!',
          type: QuizType.Question,
          quizes: questionQuizes,
        },*/
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
        {
          title: 'Simple Pictos',
          type: QuizType.Picto,
          quizes: pictoQuizes,
        },
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
    this.scoreService.teamGreenScore = 0;
    this.scoreService.teamRedScore = 0;
  };

  // TODO Game State Service
  public OnClickNext = (): void => {
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
