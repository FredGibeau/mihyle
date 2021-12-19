import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PictureQuiz } from '../../interfaces/picture.interface';

@Component({
  selector: 'mihyle-picture-quiz',
  templateUrl: './picture-quiz.component.html',
  styleUrls: ['./picture-quiz.component.scss'],
})
export class PictureQuizComponent implements AfterViewInit, OnChanges {
  @Input()
  pictureQuiz: PictureQuiz | undefined = undefined;

  @Input()
  questionIndex: number | undefined | null = undefined;

  @ViewChild('picture')
  picture: ElementRef | undefined = undefined;

  private animationPlayer: AnimationPlayer | undefined;

  constructor(private animationBuilder: AnimationBuilder) {}

  private startAnimation(): void {
    if (!this.picture) {
      console.log(
        'trying to bind the blur animation to the picture, but picture was undefined.'
      );
      return;
    }

    const animation = this.animationBuilder.build([
      style({
        filter: 'blur(50px)',
      }),
      animate('3s', style({ filter: 'blur(0px)' })),
    ]);

    this.animationPlayer = animation.create(this.picture.nativeElement);
    this.animationPlayer.play();
  }

  public ngAfterViewInit(): void {
    this.startAnimation();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.pictureQuiz.isFirstChange()) {
      if (!this.animationPlayer) {
        console.log('Trying to reset the animation, but player was undefined');
        return;
      }

      this.animationPlayer.reset();
      this.animationPlayer.play();
    }
  }

  public pauseAnimation(): void {
    if (!this.animationPlayer) {
      console.log('Trying to pause the animation, but player was undefined');
      return;
    }

    this.animationPlayer.pause();
  }

  public resumeAnimation(): void {
    if (!this.animationPlayer) {
      console.log('Trying to resume the animation, but player was undefined');
      return;
    }

    this.animationPlayer.play();
  }
}
