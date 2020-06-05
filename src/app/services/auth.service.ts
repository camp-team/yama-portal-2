import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // afUser$: Observable<User> = this.afAuth.user; // 後で消去
  userId: string;

  afUser$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        return this.db.doc<User>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.afUser$.subscribe((user) => {
      this.userId = user && user.uid;
    });
  }

  // login() {
  //   this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
  //     this.snackBar.open('ログインしました', null, {
  //       duration: 2000,
  //     });
  //   });
  // }
  Googlelogin() {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithPopup(provider).then(() => {
      this.snackBar.open('ログインしました', null, {
        duration: 2000,
      });
    });
  }

  FacebookLogin() {
    return this.afAuth.signInWithPopup(
      new auth.FacebookAuthProvider().setCustomParameters({
        prompt: 'select_account',
      })
    );
  }

  TwitterLogin() {
    return this.afAuth.signInWithPopup(
      new auth.TwitterAuthProvider().setCustomParameters({
        prompt: 'select_account',
      })
    );
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました', null, {
        duration: 2000,
      });
    });
    this.router.navigateByUrl('/');
  }
}
