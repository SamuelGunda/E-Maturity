import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-serivce/auth.service';

@Component({
    selector: 'app-constructor-select',
    templateUrl: './constructor-select.component.html',
    styleUrls: ['./constructor-select.component.css'],
})
export class ConstructorSelectComponent implements OnInit {
    constructor(
        private authServ: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {
        if (!this.authServ.adminLog) {
            this.router.navigateByUrl('/');
        }
    }
}
