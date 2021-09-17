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
import { StateService } from '../services/state.service';
import { LevelTypes } from '../enums/enum';
import { take } from 'rxjs/operators';
import { ChallengeFailedComponent } from './modals/challenge-failed/challenge-failed.component';

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
  public timeRecord: TimeRecord = { easy: null, difficult: null };
  public level: LevelTypes = LevelTypes.Easy;
  public timeLimit: number = 0;
  public timeChallengeFlag = false;
  public timeLimitAlert = false;

  private timerSubscription!: Subscription;
  private levelSubscription!: Subscription;
  private timeLimitSubscription!: Subscription;

  @HostListener('window:blur', ['$event']) onBlur(event: FocusEvent): void {
    if (!this.gameCompletedFlag) {
      this.paused = true;
    }
  }

  constructor(
    private dialog: MatDialog,
    private timeService: TimeToStringService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.timeLimitSubscription = this.stateService.timeValue
      .pipe(take(1))
      .subscribe((value) => {
        this.timeLimit = value;
      });
    this.levelSubscription = this.stateService.stateLevel
      .pipe(take(1))
      .subscribe((value) => {
        this.level = value;
        this.initializeTime();
      });
    this.timeClock();
    this.getTimeRecord();
  }

  private initializeTime() {
    if (this.level === LevelTypes.TimeChallenge) {
      this.time = this.timeLimit;
      this.timeChallengeFlag = true;
    }
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
    if (this.level === LevelTypes.Easy) {
      if (!this.timeRecord.easy) {
        this.timeRecord.easy = this.time;
      } else if (this.time < this.timeRecord.easy) {
        this.timeRecord.easy = this.time;
      }
    } else if (this.level === LevelTypes.Difficult) {
      if (!this.timeRecord.difficult) {
        this.timeRecord.difficult = this.time;
      } else if (this.time < this.timeRecord.difficult) {
        this.timeRecord.difficult = this.time;
      }
    }
    localStorage.setItem('timeRecord', JSON.stringify(this.timeRecord));
  }

  private showCompletedModal() {
    let bestTime = 0;
    if (this.level === LevelTypes.Easy) {
      bestTime = this.timeRecord.easy || this.time;
    } else if (this.level === LevelTypes.Difficult) {
      bestTime = this.timeRecord.difficult || this.time;
    }
    this.dialog.open(CompleteModalComponent, {
      data: {
        time: this.time,
        bestTime,
        level: this.level,
      },
      panelClass: 'complete-modal',
      disableClose: true,
    });
  }

  private timeClock(): void {
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      if (!this.paused && !this.gameCompletedFlag) {
        this.changeTimerValue();
      }
    });
  }

  private changeTimerValue(): void {
    if (this.timeChallengeFlag) {
      this.time--;
      if (this.time <= 59) {
        this.timeLimitAlert = true;
      }
      if (this.time === 0) {
        this.unsubscribeTimer();
        this.gameCompletedFlag = true;
        this.ringAnimation = false;
        this.challengeFailed();
      }
    } else {
      this.time++;
    }
    this.timerDisplay = this.timeService.getDisplayTimer(this.time);
  }

  private challengeFailed(): void {
    this.dialog.open(ChallengeFailedComponent, {
      panelClass: 'complete-modal',
      disableClose: true,
    });
  }

  private unsubscribeTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribeTimer();
    if (this.levelSubscription) {
      this.levelSubscription.unsubscribe();
    }
    if (this.timeLimitSubscription) {
      this.timeLimitSubscription.unsubscribe();
    }
  }
}
