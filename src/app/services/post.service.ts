import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../interfaces/post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  createPost(post: Post) {
    const id = this.db.createId();
    this.db
      .doc(`posts/${id}`)
      .set(post)
      .then(() => {
        this.snackBar.open('投稿しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      });
  }

  getPost(): Observable<Post[]> {
    return this.db
      .collection<Post>('posts', (ref) => {
        return ref.limit(2);
      })
      .valueChanges();
  }
}
