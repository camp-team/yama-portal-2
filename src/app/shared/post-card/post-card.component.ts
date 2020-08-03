import { Component, OnInit, Input } from '@angular/core';
import { PostWithUser } from 'src/app/interfaces/post';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: PostWithUser;

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  user$: Observable<User> = this.userService.user$.pipe(
    tap(async (user) => {
      this.isLiked = await this.postService.isLiked(user?.uid, this.post.id);
    })
  );

  isProcessing: boolean;
  isLiked: boolean;

  ngOnInit(): void {
    this.user$.subscribe();
  }
  async likePost(post: PostWithUser): Promise<void[]> {
    this.isProcessing = true;
    const user: User = await this.userService.filterGetUserWithSnapShot();
    if (user === null) {
      this.isProcessing = false;
      return;
    }
    this.post.likeCount++;
    this.isLiked = true;

    return this.postService
      .likePost(post, user.uid)
      .finally(() => (this.isProcessing = false));
  }

  unLikePost(postId: string): Promise<void[]> {
    const uid: string = this.userService.uid;
    this.post.likeCount--;
    this.isLiked = false;
    return this.postService.unlikePost(postId, uid);
  }
}
