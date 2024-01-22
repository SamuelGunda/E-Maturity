import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import {Observable} from "rxjs";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLoggedIn = false
userData:Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth) {
  // @ts-ignore
  this.userData = afAuth.authState;
  }

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      this.isLoggedIn = true;
      localStorage.setItem("email", JSON.stringify(res.user))
    })
    
  }

  login(email: string, password: string) {
     return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res=>{
      this.isLoggedIn = true;
      localStorage.setItem("email", JSON.stringify(res.user))
    })
  }

  logout() {
    this.afAuth.signOut()
    localStorage.removeItem("email");
  }
}
