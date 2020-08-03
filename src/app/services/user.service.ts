import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap, first } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {
    console.log(this.uid);
  }
  uid: string;
  user$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((user) => {
      if (user) {
        this.uid = user.uid;
        return this.getUserByUid(this.uid);
      } else {
        return of(null);
      }
    })
  );

  async filterGetUserWithSnapShot(): Promise<User> {
    const user = await this.getUserWithSnapShot();
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  getUserByUid(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  changeUserName(uid: string, name: string): Promise<void> {
    return this.db.doc(`users/${uid}`).update({
      name,
    });
  }

  getUserWithSnapShot(): Promise<User> {
    return this.user$.pipe(first()).toPromise();
  }

  async changeUserAvater(uid: string, url: string): Promise<void> {
    const result = await this.storage
      .ref(`users/${uid}`)
      .putString(url, 'data_url');
    const avaterURL = await result.ref.getDownloadURL();
    return this.db.doc(`users/${uid}`).update({
      avaterURL,
    });
  }
}
