import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { take } from 'rxjs/operators';
import { PostWithUser } from 'src/app/interfaces/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  index: SearchIndex = this.searchService.index.posts;
  searchControl: FormControl = new FormControl('');
  page: 0;
  posts: PostWithUser[] = [];
  maxPage: number = 5;
  loading: boolean;
  requestOptions: any = {};
  searchQuery: string;

  constructor(
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
      this.search();
    });
  }

  ngOnInit() {}

  search() {
    this.loading = true;
    const searchOptions = {
      ...this.requestOptions,
    };
    this.searchService
      .getPostWithUser(this.searchQuery, searchOptions)
      .then(async (result) => {
        const items = await result.pipe(take(1)).toPromise();

        this.posts.push(...items);
      })
      .finally(() => (this.loading = false));
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
    console.log('add');
    this.requestOptions.page++;
    this.search();
  }

  //   if (
  //     !this.maxPage ||
  //     (this.maxPage > this.requestOptions.page && !this.loading)
  //   ) {
  //     this.requestOptions.page++;
  //     const searchOptions = {
  //       ...this.requestOptions,
  //     };
  //     this.index.search(this.searchQuery, searchOptions).then((result) => {
  //       this.maxPage = result.nbPages;
  //       this.items.push(...result.hits);
  //       this.loading = false;
  //     });
  //   }
  // }
}
