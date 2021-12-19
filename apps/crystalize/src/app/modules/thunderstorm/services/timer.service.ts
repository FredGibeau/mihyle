import { Injectable } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  isTimerActive = false;
  timer: number | undefined | null = undefined;
  timerEnds$: Subject<void> | undefined | null = undefined;

  public startTimer(): void {
    if (!this.timer) {
      console.log('Trying to start timer, but timer is undefined.');

      return;
    }

    if (!this.timerEnds$) {
      console.log('Trying to start timer, but timer end is undefined.');

      return;
    }

    interval(1000)
      .pipe(takeUntil(this.timerEnds$))
      .subscribe(() => {
        if (!this.timer) {
          console.log('Timer passed in the subscribe, but timer is undefined.');
          return;
        }

        this.isTimerActive = true;
        --this.timer;

        if (this.timer === 0) {
          if (!this.timerEnds$) {
            console.log(
              'Tried to end the timer, but the timerEnds subject is undefined.'
            );
            return;
          }

          this.timerEnds$.next();
          this.timerEnds$.complete();
          this.timer = null;
          this.timerEnds$ = null;
          this.isTimerActive = false;
        }
      });
  }

  public initializeTimer(seconds: number): void {
    this.timer = seconds;

    if (this.timerEnds$) {
      this.timerEnds$.next();
      this.timerEnds$.complete();
      this.isTimerActive = false;
    }

    this.timerEnds$ = new Subject<void>();
  }
}
