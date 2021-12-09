import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionCard } from '../../interfaces/question.interface';

@Component({
  selector: 'mihyle-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit, OnChanges {
  @Input()
  questionCard: QuestionCard | undefined | null;

  visibleTitle: string;
  visibleBody: string;
  visibleImageUrl: string;

  interactionText: string;

  isQuestionVisibleState$: BehaviorSubject<boolean>;

  constructor() {
    this.questionCard = undefined;

    this.visibleTitle = '';
    this.visibleBody = '';
    this.visibleImageUrl = '';

    this.interactionText = 'View Answer';
    this.isQuestionVisibleState$ = new BehaviorSubject<boolean>(true);
  }

  ngOnInit(): void {
    this.isQuestionVisibleState$.subscribe((isQuestionVisible) => {
      this.onQuestionVisibleStateChange(isQuestionVisible);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(_changes: SimpleChanges): void {
    this.isQuestionVisibleState$.next(true);
  }

  onInteractionButton = (): void => {
    this.isQuestionVisibleState$.next(!this.isQuestionVisibleState$.value);
  };

  private onQuestionVisibleStateChange = (isQuestionVisible: boolean): void => {
    if (isQuestionVisible) {
      this.showQuestion();
    } else {
      this.showAnswer();
    }
  };

  private showQuestion = (): void => {
    this.visibleTitle = this.questionCard?.question.title || '';
    this.visibleBody = this.questionCard?.question.question || '';
    this.visibleImageUrl = this.questionCard?.question.imageUrl || '';
    this.interactionText = 'View Answer';
  };

  private showAnswer = (): void => {
    this.visibleTitle = this.questionCard?.answer.title || '';
    this.visibleBody = this.questionCard?.answer.answer || '';
    this.visibleImageUrl = this.questionCard?.answer.imageUrl || '';
    this.interactionText = 'View Question';
  };
}
