import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TimeData } from 'src/app/interfaces/interface';
import { TimeToStringService } from 'src/app/services/time-to-string.service';

@Component({
  selector: 'app-complete-modal',
  templateUrl: './complete-modal.component.html',
  styleUrls: ['./complete-modal.component.scss'],
})
export class CompleteModalComponent implements OnInit {
  public time: string = '';
  public bestTime: string = '';
  public starGain = {
    one: true,
    two: false,
    three: false,
  };
  public newRecord = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public timeObj: TimeData,
    private dialogRef: MatDialogRef<CompleteModalComponent>,
    private router: Router,
    private timeService: TimeToStringService
  ) {}

  ngOnInit(): void {
    this.time = this.timeService.getDisplayTimer(this.timeObj.time);
    this.bestTime = this.timeService.getDisplayTimer(this.timeObj.bestTime);
    this.checkNewRecord();
    this.checkStarGain();
  }

  private checkNewRecord() {
    if (this.timeObj.time < this.timeObj.bestTime) {
      this.newRecord = true;
    }
  }

  private checkStarGain() {
    if (this.timeObj.time < 400) {
      this.starGain.two = true;
    }
    if (this.timeObj.time < 300) {
      this.starGain.three = true;
    }
  }

  public navigateToMenu() {
    this.dialogRef.close();
    this.router.navigate(['']);
  }
}
