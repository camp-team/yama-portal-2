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
  GoogleLogin() {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.snackBar.open('ログインしました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(
              '同じメールアドレスで複数のアカウントを作成することはできません'
            );
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      });
  }

  FacebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.snackBar.open('ログインしました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(
              '同じメールアドレスで複数のアカウントを作成することはできません'
            );
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      });
  }

  TwitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.snackBar.open('ログインしました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(
              '同じメールアドレスで複数のアカウントを作成することはできません'
            );
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      });
  }

  createUser(params: { email: string; password: string }) {
    this.afAuth
      .createUserWithEmailAndPassword(params.email, params.password)
      .then((result) => {
        result.user.sendEmailVerification();
        this.snackBar.open('ログインしました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('このアドレスは既に登録されています。');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      });
  }

  emailLogin(params: { email: string; password: string }) {
    this.afAuth
      .signInWithEmailAndPassword(params.email, params.password)
      .then(() => {
        this.snackBar.open('ログインしました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('このメールアドレスのユーザーは見つかりません');
            break;
          case 'auth/wrong-password':
            alert('パスワードが間違っています');
            break;
          case 'auth/invalid-email':
            alert('メールアドレスが不正です');
            break;
        }
      });
  }

  resetPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email).catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          alert('このメールアドレスのユーザーは見つかりません');
          break;
        case 'auth/wrong-password':
          alert('パスワードが間違っています');
          break;
        case 'auth/invalid-email':
          alert('メールアドレスが不正です');
          break;
      }
    });
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
