import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LevelTypes } from '../enums/enum';
import { TimeRecord } from '../interfaces/interface';
import { StateService } from '../services/state.service';
import { TimeToStringService } from '../services/time-to-string.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public timeRecord: TimeRecord = { easy: null, difficult: null };
  public recordFound = false;
  public selectedLevel = LevelTypes.Easy;
  public showTimeInput = false;
  public timeLimit!: number;
  public easyBestTime: string = '';
  public difficultBestTime: string = '';
  public levels = [
    {
      name: 'Easy',
      value: LevelTypes.Easy,
    },
    {
      name: 'Difficult',
      value: LevelTypes.Difficult,
    },
    {
      name: 'Time Challenge',
      value: LevelTypes.TimeChallenge,
    },
  ];

  constructor(
    private stateService: StateService,
    private router: Router,
    private timeService: TimeToStringService
  ) {}

  ngOnInit(): void {
    this.getTimeRecord();
  }

  private getTimeRecord() {
    const data = localStorage.getItem('timeRecord');
    if (data) {
      this.recordFound = true;
      this.timeRecord = JSON.parse(data);
      this.easyBestTime = this.timeService.getDisplayTimer(
        this.timeRecord.easy
      );
      this.difficultBestTime = this.timeService.getDisplayTimer(
        this.timeRecord.difficult
      );
    }
  }

  public levelSelected(value: LevelTypes) {
    if (value === LevelTypes.TimeChallenge) {
      this.showTimeInput = true;
    } else {
      this.showTimeInput = false;
    }
  }

  public play() {
    if (this.selectedLevel === LevelTypes.TimeChallenge) {
      if (this.timeLimit) {
        this.stateService.updateTime(this.timeLimit);
      } else {
        return;
      }
    }
    this.stateService.updateLevel(this.selectedLevel);
    this.router.navigate(['game']);
  }
}
