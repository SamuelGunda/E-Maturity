import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  UserCredential,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  userData: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    // @ts-ignore
    this.userData = afAuth.authState;
    this.afAuth.setPersistence('session');
    this.checkAuthState();
  }

  googleSignIn(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(getAuth(), provider)
      .then((result: UserCredential) => {
        localStorage.setItem('uid', result.user?.uid);
        console.log(result);
        this.isLoggedIn = true;
        return result;
      })
      .catch((error) => {
        console.log(error);
        return {} as UserCredential;
      });
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
      password
    );
    if (!userCredential.user) {
      return;
    }
    const uid = userCredential.user.uid;
    localStorage.setItem('uid', uid);
    localStorage.setItem('User_info', JSON.stringify(userCredential.user));
    this.isLoggedIn = true;
    if (rememberMe) {
      localStorage.setItem('rememberMe', JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem('rememberMe');
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.afAuth.signOut().then((r) => {
      // localStorage.removeItem('rememberMe');
      localStorage.removeItem('User_info');
      localStorage.removeItem('uid');
    });
  }

  checkAuthState(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
}
