import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { signInWithPopup, signOut, GoogleAuthProvider, getAuth} from "firebase/auth";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  userData: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    // @ts-ignore
    this.userData = afAuth.authState;
  }

  googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider);
  }
  
  googleSignOut() {
    signOut(getAuth());
  }

  register(email: string, password: string, fname: string, lname: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        return res.user?.updateProfile({
          displayName: `${fname} ${lname}`,
        });
      });
  }

  async login(email: string, password: string, rememberMe: boolean) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(
      email,
      password,
    );
    if (!userCredential.user) {
      return;
    }
    const uid = userCredential.user.uid;
    this.isLoggedIn = true;
    if (rememberMe) {
      localStorage.setItem('rememberMe', JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem('rememberMe');
    }
    localStorage.setItem('uid', uid);
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('User_info');
    localStorage.removeItem('uid');
    this.afAuth.signOut();
  }
}
