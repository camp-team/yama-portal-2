import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { take } from 'rxjs/operators';
import { PostWithUser } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  index: SearchIndex = this.searchService.index.posts;
  searchControl: FormControl = new FormControl('');
  page: 0;
  posts: PostWithUser[];
  maxPage = 5;
  loading: boolean;
  requestOptions: any = {};
  searchQuery: string;
  user$ = this.authService.user$;
  private isInit = true;
  createdAtFilter: string;
  tagFilter: string[];
  categoriFilter: string[];
  sort: string;

  constructor(
    public searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    public uiService: UiService,
    private authService: AuthService
  ) {
    this.route.queryParamMap.subscribe((param) => {
      this.posts = [];
      this.searchQuery = param.get('searchQuery') || '';
      this.requestOptions = {
        page: 0,
        hitsPerPage: 6,
      };
      this.categoriFilter = (param.get('categories') || '').split(',');
      this.sort = param.get('sort') || 'posts';
      this.search();
      this.isInit = false;
    });
  }

  ngOnInit() {}

  search() {
    this.loading = true;
    this.categoriFilter = this.categoriFilter.map(
      (category) => `category:${category}`
    );
    const searchOptions = {
      ...this.requestOptions,
      facetFilters: [this.categoriFilter, 'public:true'],
    };
    console.log(searchOptions);
    setTimeout(() => {
      this.searchService
        .getPostWithUser(
          this.searchQuery,
          searchOptions,
          this.sort,
          this.isInit
        )
        .then(async (result) => {
          const items = await result.pipe(take(1)).toPromise();
          this.posts.push(...items);
        })
        .finally(() => (this.loading = false));
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
    this.requestOptions.page++;
    console.log(this.requestOptions.page);
    this.search();
  }
}
