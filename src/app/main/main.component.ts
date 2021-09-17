import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { Subscription, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CompleteModalComponent } from './modals/complete-modal/complete-modal.component';
import { TimeToStringService } from '../services/time-to-string.service';
import { TimeRecord } from '../interfaces/interface';

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
  public timeRecord: TimeRecord = { easy: 0, difficult: 0 };

  private timerSubscription!: Subscription;

  @HostListener('window:blur', ['$event']) onBlur(event: FocusEvent): void {
    if (!this.gameCompletedFlag) {
      this.paused = true;
    }
  }

  constructor(
    private dialog: MatDialog,
    private timeService: TimeToStringService
  ) {}

  ngOnInit(): void {
    this.timeClock();
    this.getTimeRecord();
  }

  private getTimeRecord() {
    const data = localStorage.getItem('timeRecord');
    if (data) {
      this.timeRecord = JSON.parse(data);
    }
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
    this.showCompletedModal();
    this.saveBestTime();
  }

  private saveBestTime() {
    if (!this.timeRecord.easy) {
      this.timeRecord.easy = this.time;
    } else if (this.time < this.timeRecord.easy) {
      this.timeRecord.easy = this.time;
    }
  }

  private showCompletedModal() {
    this.dialog.open(CompleteModalComponent, {
      data: {
        time: this.time,
        bestTime: this.time,
      },
      panelClass: 'complete-modal',
      disableClose: true,
    });
  }

  private timeClock() {
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      if (!this.paused && !this.gameCompletedFlag) {
        this.time++;
        this.timerDisplay = this.timeService.getDisplayTimer(this.time);
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
