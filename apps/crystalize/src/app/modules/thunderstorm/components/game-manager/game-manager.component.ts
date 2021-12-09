import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionCard } from '../../interfaces/question.interface';

@Component({
  selector: 'mihyle-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss'],
})
export class GameManagerComponent {
  questionCards: QuestionCard[] = [
    {
      question: {
        title: 'Title Question 1',
        question: 'The question 1',
        imageUrl: '',
      },
      answer: {
        title: 'Title Answer 1',
        answer: 'The answer 1',
        imageUrl: '',
      },
    },
    {
      question: {
        title: 'Title Question 2',
        question: 'The question 2',
        imageUrl: '',
      },
      answer: {
        title: 'Title Answer 2',
        answer: 'The answer 2',
        imageUrl: '',
      },
    },
    {
      question: {
        title: 'Title Question 3',
        question: 'The question 3',
        imageUrl: '',
      },
      answer: {
        title: 'Title Answer 3',
        answer: 'The answer 3',
        imageUrl: '',
      },
    },
  ];

  currentQuestion$: BehaviorSubject<QuestionCard>;

  constructor() {
    this.currentQuestion$ = new BehaviorSubject<QuestionCard>(
      this.questionCards[0]
    );
  }

  OnClickNext = (): void => {
    if (this.currentQuestion$.value) {
      const currentIndex = this.questionCards.indexOf(
        this.currentQuestion$.value
      );

      if (currentIndex < this.questionCards.length - 1) {
        this.currentQuestion$.next(this.questionCards[currentIndex + 1]);
      }
    }
  };
}
