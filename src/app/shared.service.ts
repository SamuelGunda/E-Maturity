import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isDisplayed = true;

  toggleVisibility() {
    this.isDisplayed = !this.isDisplayed;
  }

  getVisibility() {
    return this.isDisplayed;
  }
}
