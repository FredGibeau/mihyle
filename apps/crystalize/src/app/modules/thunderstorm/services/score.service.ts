import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  public teamRedScore = 0;
  public teamGreenScore = 0;
}
