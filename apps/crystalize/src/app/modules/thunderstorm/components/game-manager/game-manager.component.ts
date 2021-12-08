import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'mihyle-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss'],
})
export class GameManagerComponent {
  questions: string[] = ['Question #1', 'Question #2', 'Question #3'];
  currentQuestionIndex: number;

  constructor() {
    this.currentQuestionIndex = 0;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.onPressEnter();
    }
  }

  onPressEnter() {
    ++this.currentQuestionIndex;
  }
}
