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
import { UiService } from 'src/app/services/ui.service';

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
  searchControl: FormControl = new FormControl('');
  page: 0; // ページを管理するプロパティ
  items = []; // リストを保持
  maxPage: number;
  loading: boolean;
  requestOptions: any = {};
  searchQuery: string;

  // 検索結果の格納プロパティ
  result: {
    nbHits: number; // ヒット件数
    hits: any[]; // 結果のリスト
  };

  constructor(
    // private postService: PostService,
    public searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    public uiService: UiService
  ) {
    this.route.queryParamMap.subscribe((param) => {
      this.searchQuery = param.get('searchQuery') || '';
      this.requestOptions = {
        page: 0,
        hitsPerPage: 6,
      };
      // // 検索キーワードに初期値をセット
      // this.searchService.searchControl.patchValue(searchQuery, {
      //   emitEvent: false, // 重要
      // });
      this.search();
    });
  }

  ngOnInit() {}

  search() {
    const searchOptions = {
      ...this.requestOptions,
    };
    this.index.search(this.searchQuery, searchOptions).then((result) => {
      // 検索結果を格納
      this.maxPage = result.nbPages; // 最大ページ数を保持
      this.items.push(...result.hits); // 結果リストに追加取得分を追加
      this.loading = false; // ローディング終了

      console.log(this.items);
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

  addSearch() {
    console.log('check1');
    if (
      !this.maxPage ||
      (this.maxPage > this.requestOptions.page && !this.loading)
    ) {
      this.requestOptions.page++;
      this.search();
    }
  }

  check() {
    console.log('check');
  }
}
