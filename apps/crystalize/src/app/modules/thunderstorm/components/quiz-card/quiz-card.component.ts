import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../../interfaces/quiz.interface';

@Component({
  selector: 'mihyle-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent implements OnInit, OnChanges {
  @Input()
  quiz: Quiz | undefined = undefined;

  @Input()
  questionIndex: number | undefined = undefined;

  isQuestionVisibleState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  visibleBody: string | undefined = undefined;
  interactionText: string | undefined = undefined;

  usesFallbackFont = false;

  private onQuestionVisibleStateChange = (isQuestionVisible: boolean): void => {
    if (isQuestionVisible) {
      this.showQuiz();
    } else {
      this.showAnswer();
    }

    if (!this.quiz) {
      console.log(
        'Trying to figure out wich font to use, but the quiz is null.'
      );
      return;
    }

    if (!this.quiz.questions) {
      console.log(
        'Trying to figure out wich font to use, but the questions are null.'
      );
      return;
    }

    if (this.questionIndex === undefined) {
      console.log(
        'Trying to figure out wich font to use, but the question index is null.'
      );
      return;
    }

    console.log('switch');

    this.usesFallbackFont =
      this.isQuestionVisibleState$.value &&
      this.quiz.questions[this.questionIndex][0] === '_';
  };

  private showQuiz = (): void => {
    if (!this.quiz) {
      console.log(
        'Trying to show a quiz question in QuizCardComponent, but the current quiz is actually undefined.'
      );
      return;
    }

    if (!this.quiz.questions) {
      console.log(
        "Trying to show a quiz question in QuizCardComponent, but the current quiz's question is actually undefined."
      );
      return;
    }

    if (this.questionIndex === undefined || this.questionIndex === null) {
      console.log(
        'Trying to show a quiz question in QuizCardComponent, but the current questionIndex is actually undefined.'
      );
      console.log(this.questionIndex);
      return;
    }

    this.visibleBody = this.quiz.questions[this.questionIndex];
    this.interactionText = 'View Answer';
  };

  private showAnswer = (): void => {
    if (!this.quiz) {
      console.log(
        'Trying to show a quiz answer in QuizCardComponent, but the current quiz is actually undefined.'
      );
      return;
    }

    if (!this.quiz.answers) {
      console.log(
        "Trying to show a quiz answer in QuizCardComponent, but the current quiz's question is actually undefined."
      );
      return;
    }

    if (this.questionIndex === undefined || this.questionIndex === null) {
      console.log(
        'Trying to show a quiz answer in QuizCardComponent, but the current questionIndex is actually undefined.'
      );
      return;
    }

    this.visibleBody = this.quiz.answers[this.questionIndex];
    this.interactionText = 'View Question';
  };

  public ngOnInit(): void {
    this.isQuestionVisibleState$.subscribe((isQuestionVisible) => {
      this.onQuestionVisibleStateChange(isQuestionVisible);
    });
  }

  public ngOnChanges(): void {
    this.isQuestionVisibleState$.next(true);

    if (!this.quiz) {
      console.log(
        "Trying to initialize the Quiz's timer, but Quiz is undefined."
      );
      return;
    }
  }

  public onInteractionButton = (): void => {
    this.isQuestionVisibleState$.next(!this.isQuestionVisibleState$.value);
  };
}
