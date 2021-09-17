import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LevelTypes } from 'src/app/enums/enum';
import { modalData, starCount } from 'src/app/interfaces/interface';
import { StarCountService } from 'src/app/services/star-count.service';
import { TimeToStringService } from 'src/app/services/time-to-string.service';

@Component({
  selector: 'app-complete-modal',
  templateUrl: './complete-modal.component.html',
  styleUrls: ['./complete-modal.component.scss'],
})
export class CompleteModalComponent implements OnInit {
  public time: string = '';
  public bestTime: string = '';
  public level = LevelTypes.Easy;
  public starGain: starCount = {
    one: false,
    two: false,
    three: false,
  };
  public newRecord = false;
  public challengeFlag = false;
  public cheereLabel = 'Congratulations';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: modalData,
    private dialogRef: MatDialogRef<CompleteModalComponent>,
    private router: Router,
    private timeService: TimeToStringService,
    private starCountService: StarCountService
  ) {}

  ngOnInit(): void {
    this.time = this.timeService.getDisplayTimer(this.data.time);
    this.bestTime = this.timeService.getDisplayTimer(this.data.bestTime);
    this.level = this.data.level;
    this.UpdateChallengeFlag();
    if (!this.challengeFlag) {
      this.checkNewRecord();
      this.checkStarGain();
    }
  }

  private UpdateChallengeFlag() {
    if (this.level === LevelTypes.TimeChallenge) {
      this.challengeFlag = true;
      this.cheereLabel = 'Challenge Completed';
    }
  }

  private checkNewRecord() {
    if (this.data.time < this.data.bestTime) {
      this.newRecord = true;
    }
  }

  private checkStarGain() {
    this.starGain = this.starCountService.count(this.data.time, this.level);
  }

  public navigateToMenu() {
    this.dialogRef.close();
    this.router.navigate(['']);
  }
}
