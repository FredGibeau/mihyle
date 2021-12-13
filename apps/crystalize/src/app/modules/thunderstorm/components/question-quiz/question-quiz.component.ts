import { Component, Input } from '@angular/core';
import { QuestionQuiz } from '../../interfaces/question.interface';

@Component({
  selector: 'mihyle-question-quiz',
  templateUrl: './question-quiz.component.html',
})
export class QuestionQuizComponent {
  @Input()
  questionQuiz: QuestionQuiz | undefined = undefined;

  @Input()
  questionIndex: number | undefined | null = undefined;
}
