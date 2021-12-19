import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameManagerComponent } from './components/game-manager/game-manager.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { KaraokeQuizComponent } from './components/karaoke-quiz/karaoke-quiz.component';
import { QuestionQuizComponent } from './components/question-quiz/question-quiz.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { PictureQuizComponent } from './components/picture-quiz/picture-quiz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PictoQuizComponent } from './components/picto-quiz/picto-quiz.component';

@NgModule({
  declarations: [
    GameManagerComponent,
    QuestionQuizComponent,
    KaraokeQuizComponent,
    QuizCardComponent,
    PictureQuizComponent,
    PictoQuizComponent,
  ],
  imports: [CommonModule, YouTubePlayerModule, BrowserAnimationsModule],
  exports: [GameManagerComponent],
})
export class ThunderstormModule {}
