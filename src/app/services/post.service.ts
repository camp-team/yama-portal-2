import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../interfaces/post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  // createPost(post: Omit<Post, 'id' | 'createdAt' | 'userId'>) {
  //   const id = this.db.createId();
  //   return this.db
  //     .doc<Post>(`posts/${id}`)
  //     .set({
  //       id,
  //       createdAt: firestore.Timestamp.now(),
  //       userId: this.authService.userId,
  //       ...post,
  //     })
  //     .then(() => {
  //       this.snackBar.open('投稿しました', null, {
  //         duration: 2000,
  //       });
  //       this.router.navigateByUrl('/');
  //     });
  // }
  async createPost(
    post: Omit<Post, 'id' | 'createdAt' | 'userId'>,
    images: {
      imageURL: File;
    }
  ) {
    const id = this.db.createId();
    const urls = await this.uploadImage(id, Object.values(images));
    const [imageURL] = urls;
    return this.db
      .doc<Post>(`posts/${id}`)
      .set({
        id,
        imageURL,
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

  async uploadImage(id: string, files: File[]): Promise<string[]> {
    if (!files) {
      console.log('test');
      const urls = [null];
    } else {
      console.log('test2');
      return Promise.all(
        files.map((file, index) => {
          const ref = this.storage.ref(`posts/${id}-${index}`);
          return ref.put(file);
        })
      ).then(async (tasks) => {
        const urls = [];
        for (const task of tasks) {
          urls.push(await task.ref.getDownloadURL());
        }
        return urls;
      });
    }
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
