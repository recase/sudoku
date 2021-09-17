import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LevelTypes } from '../enums/enum';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private level = new BehaviorSubject(LevelTypes.Easy);
  private timeLimit = new BehaviorSubject(0);
  timeValue = this.timeLimit.asObservable();
  stateLevel = this.level.asObservable();
  constructor() {}

  updateLevel(level: LevelTypes) {
    this.level.next(level);
  }

  updateTime(time: number) {
    this.timeLimit.next(Math.floor(time * 60));
  }
}
