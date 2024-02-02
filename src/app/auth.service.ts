import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from "rxjs";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  userData: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    // @ts-ignore
    this.userData = afAuth.authState;
  }

  register(email: string, password: string, fname: string, lname: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem("User_info", JSON.stringify({fname, lname}))
      });
  }

  login(email: string, password: string, rememberMe: boolean) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        if (rememberMe) {
          localStorage.setItem('rememberMe', JSON.stringify({ email, password }));
        } else {
          localStorage.removeItem('rememberMe');
        }
      });
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('User_info');
    this.afAuth.signOut();
  }
}