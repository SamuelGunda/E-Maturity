import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-serivce/auth.service';

@Component({
    selector: 'app-tos-page',
    templateUrl: './tos-page.component.html',
    styleUrls: ['./tos-page.component.css'],
})
export class TosPageComponent implements OnInit {
    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        if (sessionStorage.getItem('acceptedWindow')) {
            this.windowShown = false;
        }
    }

    windowShown: boolean = true;

    hideWindow() {
        sessionStorage.setItem('acceptedWindow', 'true');
        this.windowShown = false;
    }
}
