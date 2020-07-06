import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { SearchService } from 'src/app/services/search.service';
import algoliasearch from 'algoliasearch/lite';
import { SearchIndex } from 'algoliasearch/lite';

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
  // index: SearchIndex = this.searchService.index.label;

  // // 検索結果の格納プロパティ
  // result: {
  //   nbHits: number; // ヒット件数
  //   hits: any[]; // 結果のリスト
  // };

  config = {
    indexName: 'posts',
    searchClient,
  };

  searchParams = {
    hitsPerPage: 4,
  };

  constructor(
    private postService: PostService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    // this.search('denger');
    // console.log(this.search);
  }

  // private search(query: string) {
  //   this.index.search(query).then((result) => {
  //     // 検索結果を格納
  //     this.result = result;
  //     console.log(this.result);
  //   });
  // }
}
