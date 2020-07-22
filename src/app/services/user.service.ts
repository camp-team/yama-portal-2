import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getUserByUid(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  changeUserName(uid: string, name: string): Promise<void> {
    return this.db.doc(`users/${uid}`).update({
      name,
    });
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
