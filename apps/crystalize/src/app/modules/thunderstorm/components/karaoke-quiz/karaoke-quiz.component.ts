import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { filter, interval, Subject, takeUntil } from 'rxjs';
import { KaraokeQuiz } from '../../interfaces/karaoke.interface';

// TODO : To get types, I had to install angular/youtube player.
// Therefore, I should use the package instead of the API itself.
@Component({
  selector: 'mihyle-karaoke-quiz',
  templateUrl: './karaoke-quiz.component.html',
  styleUrls: ['./karaoke-quiz.component.scss'],
})
export class KaraokeQuizComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  karaokeQuiz: KaraokeQuiz | undefined = undefined;

  @Input()
  questionIndex: number | undefined | null = undefined;

  player: YT.Player | undefined = undefined;
  unsubscribe: Subject<void> = new Subject<void>();

  private addYoutubeApiScript = (): void => {
    const tag = document.createElement('script');
    tag.src = 'http://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];

    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      console.log(
        'No tag name has been found to create the Youtube video player.'
      );
    }

    window['onYouTubeIframeAPIReady'] = () => this.onYouTubeIframeAPIReady();
  };

  private onYouTubeIframeAPIReady = () => {
    this.initializeYoutubePlayer();
  };

  private initializeYoutubePlayer = () => {
    if (!this.karaokeQuiz) {
      console.log('Youtube frame is ready, but the Karaoke Quiz is undefined');
      return;
    }

    this.player = new window['YT'].Player('player', {
      height: '390',
      width: '640',
      videoId: this.karaokeQuiz?.youtubeVideoId,
      playerVars: {
        playsinline: 1,
        autoplay: 1,
        controls: 0,
      },
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    });
  };

  private onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === 1) {
      this.createVideoInterval();
    }
  };

  private createVideoInterval = (): void => {
    interval(500)
      .pipe(
        takeUntil(this.unsubscribe),
        filter((_) => this.player?.getPlayerState() === YT.PlayerState.PLAYING)
      )
      .subscribe((_) => {
        if (!this.player) {
          console.log(
            'Trying to get the current video time, but Player is undefined.'
          );
          return;
        }

        if (this.player.getPlayerState() !== YT.PlayerState.PLAYING) {
          console.log(
            'Trying to get the current video time, but Player is not playing.'
          );
          return;
        }

        this.checkAndPauseVideoOnTimestamp(this.player.getCurrentTime());
      });
  };

  private checkAndPauseVideoOnTimestamp = (videoTimestamp: number) => {
    if (!this.karaokeQuiz) {
      console.log(
        'Trying to check the video timestamp, but the quiz is undefined.'
      );
      return;
    }

    if (!this.karaokeQuiz.timestampsSeconds) {
      console.log(
        "Trying to check the video timestamp, but the quiz's timestamp is undefined."
      );
      return;
    }

    if (this.questionIndex === undefined || this.questionIndex === null) {
      console.log(
        'Trying to check the timestamp, but the question index is undefined.'
      );
      return;
    }

    if (
      videoTimestamp >= this.karaokeQuiz.timestampsSeconds[this.questionIndex]
    ) {
      this.player?.pauseVideo();
    }
  };

  public ngOnInit(): void {
    this.addYoutubeApiScript();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const karaokeQuizChanges = changes.karaokeQuiz?.currentValue as KaraokeQuiz;
    if (this.player && karaokeQuizChanges) {
      if (!karaokeQuizChanges.youtubeVideoId) {
        console.log(
          "Switched karaoke quiz, but the new value doesn't have a youtube video ID."
        );
        return;
      }
      this.player.loadVideoById(karaokeQuizChanges.youtubeVideoId);
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
