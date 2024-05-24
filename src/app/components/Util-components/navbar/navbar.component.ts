import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AuthService } from 'src/app/service/auth-serivce/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
    displayed: boolean = false;
    isDarkMode: boolean = false;

    constructor(
        private router: Router,
        public authServ: AuthService,
    ) {}
    changeSubCat() {
        this.displayed = !this.displayed;
    }

    addSubCat(subCat: string) {
        console.log(subCat);
        this.router.navigate(['/official-categories/' + subCat]);
    }
}
