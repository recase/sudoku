import { Injectable } from '@angular/core';
import { LevelTypes, StartCheck } from '../enums/enum';
import { starCount } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class StarCountService {
  constructor() {}

  public count(time: number, level: LevelTypes): starCount {
    const star: starCount = { one: false, three: false, two: false };
    if (level === LevelTypes.Easy) {
      if (time < StartCheck.EasyThree) {
        star.one = true;
        star.two = true;
        star.three = true;
      } else if (time < StartCheck.EasyTwo) {
        star.two = true;
        star.one = true;
      } else if (time < StartCheck.EasyOne) {
        star.one = true;
      }
    }
    if (level === LevelTypes.Difficult) {
      if (time < StartCheck.DifficultThree) {
        star.one = true;
        star.two = true;
        star.three = true;
      } else if (time < StartCheck.DiffcultTwo) {
        star.two = true;
        star.one = true;
      } else if (time < StartCheck.DifficultOne) {
        star.one = true;
      }
    }

    return star;
  }
}
