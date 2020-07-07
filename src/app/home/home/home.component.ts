import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { SearchService } from 'src/app/services/search.service';
import algoliasearch from 'algoliasearch/lite';
import { SearchIndex } from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
  // posts$: Observable<Post[]> = this.postService.getPosts();
  index: SearchIndex = this.searchService.index.posts;
  postId$: Observable<any>;

  // 検索結果の格納プロパティ
  result: {
    nbHits: number; // ヒット件数
    hits: any[]; // 結果のリスト
  };

  // config = {
  //   indexName: 'posts',
  //   searchClient,
  // };

  // searchParams = {
  //   hitsPerPage: 4,
  // };

  constructor(
    // private postService: PostService,
    public searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((param) => {
      const searchQuery = param.get('searchQuery');
      // 検索キーワードに初期値をセット
      this.searchService.searchControl.patchValue(searchQuery, {
        emitEvent: false, // 重要
      });
      this.search(searchQuery);
    });
  }

  private search(query: string) {
    this.index.search(query).then((result) => {
      // 検索結果を格納
      this.result = result;
    });
  }

  routeSearch(searchQuery: string) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        searchQuery,
      },
    });
  }
}
