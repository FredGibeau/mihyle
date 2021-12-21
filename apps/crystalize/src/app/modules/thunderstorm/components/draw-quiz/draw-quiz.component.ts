import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { fromEvent, pairwise, Subject, switchMap, takeUntil } from 'rxjs';
import { DrawQuiz } from '../../interfaces/draw-interface';

// Based uppon https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415
@Component({
  selector: 'mihyle-draw-quiz',
  templateUrl: './draw-quiz.component.html',
})
export class DrawQuizComponent implements AfterViewInit, OnChanges, OnDestroy {
  width = 550;
  height = 550;

  @Input()
  drawQuiz: DrawQuiz | undefined = undefined;

  @Input()
  questionIndex: number | undefined | null = undefined;

  @ViewChild('canvas')
  canvas: ElementRef | undefined = undefined;

  private cx: CanvasRenderingContext2D | undefined | null = undefined;
  private unsubscribe$: Subject<void> = new Subject<void>();

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap(() => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((res: [Event, Event]) => {
        const previousEvent = res[0] as MouseEvent;
        const newEvent = res[1] as MouseEvent;

        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: previousEvent.clientX - rect.left,
          y: previousEvent.clientY - rect.top,
        };

        const currentPos = {
          x: newEvent.clientX - rect.left,
          y: newEvent.clientY - rect.top,
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    // incase the context is not set
    if (!this.cx) {
      return;
    }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }

  public ngAfterViewInit(): void {
    this.initializeDrawingCanvas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.drawQuiz.isFirstChange()) {
      this.cx?.clearRect(0, 0, this.width, this.height);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initializeDrawingCanvas() {
    if (!this.canvas) {
      console.log(
        'Trying to initialize the canvas, but element ref is undefined.'
      );
      return;
    }

    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    if (!this.cx) {
      console.log('CX2D is null');
      return;
    }

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);
  }
}
