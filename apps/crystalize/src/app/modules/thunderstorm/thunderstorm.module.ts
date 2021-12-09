import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameManagerComponent } from './components/game-manager/game-manager.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';

@NgModule({
  declarations: [GameManagerComponent, QuestionCardComponent],
  imports: [CommonModule],
  exports: [GameManagerComponent],
})
export class ThunderstormModule {}
