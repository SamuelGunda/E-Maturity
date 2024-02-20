import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerIsOn = new BehaviorSubject<boolean>(false);
  private timeLeft = new BehaviorSubject<number>(0);

  setTimerIsOn(timerIsOn: boolean) {
    this.timerIsOn.next(timerIsOn);
  }

  getTimerIsOn() {
    return this.timerIsOn.asObservable();
  }

  setTimeLeft(timeLeft: number) {
    this.timeLeft.next(timeLeft);
  }

  getTimeLeft() {
    return this.timeLeft.asObservable();
  }
}