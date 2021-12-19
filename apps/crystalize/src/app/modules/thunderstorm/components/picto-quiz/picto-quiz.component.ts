import { Component, Input } from '@angular/core';
import { PictoQuiz } from '../../interfaces/picto.interface';

@Component({
  selector: 'mihyle-picto-quiz',
  templateUrl: 'picto-quiz.component.html',
})
export class PictoQuizComponent {
  @Input()
  pictoQuiz: PictoQuiz | undefined = undefined;

  @Input()
  questionIndex: number | undefined | null = undefined;
}
