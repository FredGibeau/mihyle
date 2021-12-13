import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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

  private onQuestionVisibleStateChange = (isQuestionVisible: boolean): void => {
    if (isQuestionVisible) {
      this.showQuiz();
    } else {
      this.showAnswer();
    }
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
  }

  public onInteractionButton = (): void => {
    this.isQuestionVisibleState$.next(!this.isQuestionVisibleState$.value);
  };
}
