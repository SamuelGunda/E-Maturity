import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { CookieService } from 'ngx-cookie';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  getUserId() {
    const uid = localStorage.getItem('uid');
    return uid;
  }
  isLoggedIn = false;
  userData: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private cookieService: CookieService, private firestore: AngularFirestore) {
    // @ts-ignore
    this.userData = afAuth.authState;
    this.afAuth.setPersistence('session');
    this.checkAuthState();
    this.initializeTokenListener();
  }

  initializeTokenListener() {
    this.afAuth.onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken(true).then((idToken) => {
          // New token
          console.log(idToken);
          
          // If "Remember Me" is checked, store the new token in a cookie
          if (this.cookieService.get('rememberMe')) {
            this.cookieService.put('token', idToken);
          }
        });
      }
    });
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
      password,
    );
    if (!userCredential.user) {
      return;
    }
    const uid = userCredential.user.uid;
    this.isLoggedIn = true;
  
    // Generate the token
    userCredential.user.getIdToken(true).then((idToken) => {
      // Here is your ID token
      console.log(idToken);
      
      // Send the token to Firestore
      this.firestore.collection('users').doc(uid).set({
        token: idToken
      }, { merge: true });
  
      // If "Remember Me" is checked, store the token in a cookie
      if (rememberMe) {
        this.cookieService.put('token', idToken);
      } else {
        this.cookieService.remove('token');
      }
    }).catch((error) => {
      // Handle error
      console.log(error);
    });
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
