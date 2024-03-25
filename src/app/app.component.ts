import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './service/auth-serivce/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.checkToken();
  }


  title(title: any) {
    throw new Error('Method not implemented.');
  }
}

