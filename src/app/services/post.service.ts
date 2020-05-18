import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../interfaces/post';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  createPost(post: Post) {
    const id = this.db.createId();
    this.db
      .doc(`posts/${id}`)
      .set(post)
      .then(() => {
        this.snackBar.open('投稿しました', null, {
          duration: 2000,
        });
      });
  }
}
