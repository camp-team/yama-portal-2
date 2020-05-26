import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
const algoliasearch = require('algoliasearch/lite');

const searchClient = algoliasearch(
  'YTCNWA1M3V',
  '266d4f34268aad279908ca35f27a5250'
);

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]> = this.postService.getPosts();

  config = {
    indexName: 'posts',
    searchClient,
  };

  searchParams = {
    hitsPerPage: 6,
  };

  constructor(private postService: PostService) {}

  ngOnInit(): void {}
}
