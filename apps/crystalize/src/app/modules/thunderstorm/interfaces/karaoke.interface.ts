import { Quiz } from './quiz.interface';

export class KaraokeQuiz extends Quiz {
  youtubeVideoId: string | undefined = undefined;
  timestampsSeconds: number[] | undefined = undefined;
}
