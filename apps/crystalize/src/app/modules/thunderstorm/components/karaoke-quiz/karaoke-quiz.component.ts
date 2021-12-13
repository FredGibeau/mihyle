import { Component, Input } from '@angular/core';
import { KaraokeQuiz } from '../../interfaces/karaoke.interface';

@Component({
  selector: 'mihyle-karaoke-quiz',
  templateUrl: './karaoke-quiz.component.html',
  styleUrls: ['./karaoke-quiz.component.scss'],
})
export class KaraokeQuizComponent {
  @Input()
  karaokeQuiz: KaraokeQuiz | undefined = undefined;

  @Input()
  questionIndex: number | undefined | null = undefined;
}
