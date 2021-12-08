import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameManagerComponent } from './components/game-manager/game-manager.component';

@NgModule({
  declarations: [GameManagerComponent],
  imports: [CommonModule],
  exports: [GameManagerComponent],
})
export class ThunderstormModule {}
