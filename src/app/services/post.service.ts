import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../interfaces/post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  createPost(post: Omit<Post, 'id' | 'createdAt' | 'userId'>) {
    const id = this.db.createId();
    return this.db
      .doc<Post>(`posts/${id}`)
      .set({
        id,
        createdAt: firestore.Timestamp.now(),
        userId: this.authService.userId,
        ...post,
      })
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

  getPosts(): Observable<Post[]> {
    return this.db.collection<Post>('posts').valueChanges();
  }

  deletePost(id: string): Promise<void> {
    return this.db.doc<Post>(`posts/${id}`).delete();
  }

  updatePost(post: Post) {
    return this.db.doc<Post>(`posts/${post.id}`).update(post);
  }
}
