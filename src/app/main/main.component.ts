import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild(SudokuComponent) sudokuComponent!: SudokuComponent;
  public num_buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public noteFlag: boolean = false;
  public time: number = 0;
  public timerDisplay: string = '';
  public hintCount: number = 3;
  public showHintCount: boolean = true;
  public paused: boolean = false;
  public ringAnimation: boolean = true;
  public gameCompletedFlag: boolean = false;

  private timerSubscription!: Subscription;

  @HostListener('window:blur', ['$event']) onBlur(event: FocusEvent): void {
    if (!this.gameCompletedFlag) {
      this.paused = true;
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.timeClock();
  }

  public inputEvent(num: number) {
    this.sudokuComponent.inputEvent(num);
  }
  public toggleNote(): void {
    this.noteFlag = !this.noteFlag;
  }

  public undoEvent() {
    this.sudokuComponent.undoEvent();
  }

  public togglePaused(status: boolean) {
    this.paused = status;
  }

  public showHint() {
    if (this.hintCount > 0) {
      this.sudokuComponent.showHint();
      this.hintCount--;
      if (this.hintCount === 0) {
        this.showHintCount = false;
      }
    }
  }

  public eraseEvent() {
    this.sudokuComponent.eraseEvent();
  }

  public gameCompletedEvent() {
    this.gameCompletedFlag = true;
    this.ringAnimation = false;
  }

  private timeClock() {
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      if (!this.paused && !this.gameCompletedFlag) {
        this.time++;
        this.timerDisplay = this.getDisplayTimer(this.time);
      }
    });
  }

  private getDisplayTimer(time: number): string {
    const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor((time % 3600) / 60);
    const seconds = '0' + Math.floor((time % 3600) % 60);

    let hourValue = null;
    if (hours !== '00') {
      hourValue = `${hours.slice(-2, -1)}${hours.slice(-1)}:`;
    }

    const stringValue = `${minutes.slice(-2, -1)}${minutes.slice(
      -1
    )}:${seconds.slice(-2, -1)}${seconds.slice(-1)}s`;

    if (hourValue) {
      return hourValue + stringValue;
    }
    return stringValue;
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
