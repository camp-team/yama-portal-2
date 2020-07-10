import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  index: SearchIndex = this.searchService.index.posts;
  searchControl: FormControl = new FormControl('');
  page: 0;
  items = [];
  maxPage: number;
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
    this.items = new Array();
    const searchOptions = {
      ...this.requestOptions,
    };
    this.index.search(this.searchQuery, searchOptions).then((result) => {
      this.maxPage = result.nbPages;
      this.items.push(...result.hits);
      this.loading = false;
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
    if (
      !this.maxPage ||
      (this.maxPage > this.requestOptions.page && !this.loading)
    ) {
      this.requestOptions.page++;
      const searchOptions = {
        ...this.requestOptions,
      };
      this.index.search(this.searchQuery, searchOptions).then((result) => {
        this.maxPage = result.nbPages;
        this.items.push(...result.hits);
        this.loading = false;
      });
    }
  }
}
