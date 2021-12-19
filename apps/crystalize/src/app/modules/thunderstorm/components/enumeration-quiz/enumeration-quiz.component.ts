import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { EnumerationQuiz } from '../../interfaces/enumeration.interface';

@Component({
  selector: 'mihyle-enumeration-quiz',
  templateUrl: './enumeration-quiz.component.html',
  styleUrls: ['./enumeration-quiz.component.scss'],
})
export class EnumerationQuizComponent implements OnChanges {
  @Input()
  enumerationQuiz: EnumerationQuiz | undefined = undefined;

  @Input()
  questionIndex: number | undefined | null = undefined;

  @ViewChild('input')
  input: ElementRef<HTMLInputElement> | undefined = undefined;

  enumerations: string[] = [];
  hasFailed = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.enumerationQuiz.isFirstChange()) {
      this.enumerations = [];
      this.hasFailed = false;
    }
  }

  public EnterSubmit() {
    if (!this.input) {
      console.log(
        "Input sent an Enter Submit event, but no element ref 'input' has been found."
      );
      return;
    }

    console.log(this.input.nativeElement.value);

    if (this.enumerations.indexOf(this.input.nativeElement.value) !== -1) {
      this.hasFailed = true;
    } else {
      this.enumerations.push(this.input.nativeElement.value);
      console.log(this.enumerations);
    }

    this.input.nativeElement.value = '';
  }
}
