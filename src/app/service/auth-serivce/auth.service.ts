import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, first, map, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat';
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  getAuth,
  UserCredential,
} from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Teacher } from 'src/app/model/teacher';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserId() {
    const uid = localStorage.getItem('uid');
    return uid;
  }
  isLoggedIn = false;
  teacherLogged: boolean = false;
  userData: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {
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

  async teacherLogin(username: string, password: string): Promise<boolean> {
    const teachers = await this.firestore
      .collection<Teacher>('Teachers', (ref) =>
        ref.where('teacherName', '==', username).limit(1),
      )
      .valueChanges({ idField: 'id' })
      .pipe(first())
      .toPromise();

    if (teachers && teachers.length > 0) {
      const teacher = teachers[0];
      if (teacher.teacherPassword === password) {
        this.teacherLogged = true;
        return true;
      }
    }
    return false;
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
    this.teacherLogged = false;
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('User_info');
      localStorage.removeItem('uid');

      this.teacherLogged = false;
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
