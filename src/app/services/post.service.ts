import { Injectable, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post, PostWithUser } from '../interfaces/post';
import { map, switchMap, first, take } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { firestore } from 'firebase';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

import { User } from '../interfaces/user';
import { LikedPostDocument } from '../interfaces/liked-post-document';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  @Input() post: Post;
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private userService: UserService
  ) {}

  async createPost(
    post: Omit<Post, 'id' | 'createdAt' | 'userId'>,
    file: Blob,
    currentPosition: google.maps.LatLngLiteral
  ) {
    const id = this.db.createId();
    const urls = await this.uploadImage(id, file);
    const imageURL = urls;
    const newValue: Post = {
      id,
      imageURL,
      currentPosition,
      createdAt: firestore.Timestamp.now(),
      userId: this.authService.userId,
      likeCount: 0,
      ...post,
    };
    await this.db.doc<Post>(`posts/${id}`).set(newValue);
    return newValue;
  }

  async uploadImage(id: string, file: Blob): Promise<string> {
    if (file === null) {
      const urls = null;
      return urls;
    } else {
      const result = await this.storage.ref(`posts/${id}`).put(file);
      return result.ref.getDownloadURL();
    }
  }

  getPostById(id: string): Observable<Post> {
    return this.db.doc<Post>(`posts/${id}`).valueChanges();
  }

  async getPostWithUserById(id: string): Promise<Observable<PostWithUser>> {
    const post$: Observable<Post> = this.getPostById(id);
    const uid$ = post$.pipe(map((item: Post) => item.userId));
    const uid = await uid$.pipe(take(1)).toPromise();
    const user$: Observable<User> = this.userService.getUserByUid(uid);

    return combineLatest([post$, user$]).pipe(
      map(([item, user]) => {
        return {
          ...item,
          user,
        };
      })
    );
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

  likePost(post: Post, userId: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`posts/${post.id}/likedUserIds/${userId}`).set({ userId }),
      this.db
        .doc(`users/${userId}/likedPosts/${post.id}`)
        .set({ postId: post.id }),
    ]);
  }

  unlikePost(postId: string, userId: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`posts/${postId}/likedUserIds/${userId}`).delete(),
      this.db.doc(`users/${userId}/likedposts/${postId}`).delete(),
    ]);
  }

  async isLiked(uid: string, postId: string): Promise<boolean> {
    if (uid === undefined) {
      return false;
    }
    if (postId === undefined) {
      return false;
    }
    const likedpostIds: string[] = await this.db
      .collection<LikedPostDocument>(`users/${uid}/likedPosts`)
      .valueChanges()
      .pipe(
        first(),
        map((posts) => posts.map((post) => post.postId))
      )
      .toPromise();
    return likedpostIds.includes(postId);
  }

  getLikedUserIds(postId: string): Observable<any[]> {
    return this.db
      .collection<User>(`posts/${postId}/likedUserIds`)
      .valueChanges()
      .pipe(
        switchMap((users) => {
          return combineLatest(
            users.map((user) => this.db.doc(`users/${user.uid}`).valueChanges())
          );
        })
      );
  }
}
