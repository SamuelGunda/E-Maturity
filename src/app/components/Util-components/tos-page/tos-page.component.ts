import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth-serivce/auth.service';

@Component({
  selector: 'app-tos-page',
  templateUrl: './tos-page.component.html',
  styleUrls: ['./tos-page.component.css'],
})
export class TosPageComponent {
  constructor(public authService: AuthService) {}
  windowShown: boolean = true;
  hideWindow() {
    this.windowShown = false;
  }
}
