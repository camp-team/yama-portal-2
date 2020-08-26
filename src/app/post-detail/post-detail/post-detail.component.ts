import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post, PostWithUser } from 'src/app/interfaces/post';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post$: Promise<Observable<Post>>;
  post: PostWithUser;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    route.paramMap.subscribe((params) => {
      postService.getPostWithUserById(params.get('id')).then(async (result) => {
        this.post = await result.pipe(take(1)).toPromise();
      });
    });
  }

  ngOnInit(): void {}
}
