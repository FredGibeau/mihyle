import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameManagerComponent } from './components/game-manager/game-manager.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { KaraokeQuizComponent } from './components/karaoke-quiz/karaoke-quiz.component';
import { QuestionQuizComponent } from './components/question-quiz/question-quiz.component';

@NgModule({
  declarations: [
    GameManagerComponent,
    QuestionQuizComponent,
    KaraokeQuizComponent,
    QuizCardComponent,
  ],
  imports: [CommonModule],
  exports: [GameManagerComponent],
})
export class ThunderstormModule {}
