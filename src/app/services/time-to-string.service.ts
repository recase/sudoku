import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeToStringService {
  constructor() {}

  public getDisplayTimer(time: number | null): string {
    if (time) {
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
    } else {
      return '';
    }
  }
}
