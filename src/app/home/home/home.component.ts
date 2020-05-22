import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
const algoliasearch = require('algoliasearch/lite');

const searchClient = algoliasearch(
  'YTCNWA1M3V',
  '266d4f34268aad279908ca35f27a5250'
);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]> = this.postService.getPosts();

  config = {
    indexName: 'posts',
    searchClient,
  };

  searchParams = {
    hitsPerPage: 1,
  };

  constructor(private postService: PostService) {}

  ngOnInit(): void {}
}
