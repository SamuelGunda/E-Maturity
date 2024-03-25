import { Injectable, OnInit } from '@angular/core';
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

  constructor(
    private afAuth: AngularFireAuth,
    private cookieService: CookieService,
    private firestore: AngularFirestore,
  ) {
    // @ts-ignore
    this.userData = afAuth.authState;
    this.afAuth.setPersistence('session');
    this.checkAuthState();
    this.initializeTokenListener();
  }

  checkToken() {
    console.log('ngOnInit() start');
    const token = this.cookieService.get('token');

    if (!token) {
      console.log('No token found');
      return;
    }
    console.log('Token found');
    const uid = this.cookieService.get('uid');
    if (!uid) {
      console.log('No uid found');
      return;
    }
    console.log('Uid found');
    this.firestore
      .collection('users')
      .doc(uid)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc && doc.exists) {
          console.log('Document data:', doc.data());
          const data = doc.data() as any; // casted it to (any)
          if (data && data.token === token) {
            console.log('Token is valid');
            this.isLoggedIn = true;
          }
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  initializeTokenListener() {
    console.log('initializeTokenListener() start');
    this.afAuth.onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken(true).then((idToken) => {
          console.log(idToken);

          if (this.cookieService.get('rememberMe')) {
            console.log('Storing new token in cookie' + idToken);
            
            this.cookieService.put('token', idToken);
            console.log('Storing new uid in cookie' + user.uid);
            this.cookieService.put('uid', user.uid);
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

    userCredential.user
      .getIdToken(true)
      .then((idToken) => {
        // Send the token to Firestore
        this.firestore.collection('users').doc(uid).set(
          {
            token: idToken,
          },
          { merge: true },
        );
        if (rememberMe) {
          this.cookieService.put('token', idToken);
          this.cookieService.put('uid', uid);
        } else {
          this.cookieService.remove('token');
          this.cookieService.remove('uid');
        }
      })
      .catch((error) => {
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
