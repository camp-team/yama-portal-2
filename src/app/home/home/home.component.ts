import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { take } from 'rxjs/operators';
import { PostWithUser } from 'src/app/interfaces/post';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';

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
  user$: Observable<User> = this.userService.user$;

  private isInit = true;
  createdAtFilter: string;
  categoriFilter: string[];
  sort: string;

  zoom = 16;
  center: google.maps.LatLngLiteral = {
    lat: 34.863439,
    lng: 139.001569,
  };
  // 地図のオプション
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };

  // 現在位置マーカーの座標
  currentPosition: google.maps.LatLngLiteral;
  // 現在位置マーカーのオプション
  currentPositionMarkerOption: google.maps.MarkerOptions = {
    icon: {
      url: 'assets/icons/place-black-18dp/2x/baseline_place_black_18dp.png',
      scaledSize: new google.maps.Size(32, 32),
    },
  };

  constructor(
    public searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    public uiService: UiService,
    private userService: UserService
  ) {
    // 現在位置を取得する。
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
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
    if (!this.loading) {
      this.loading = true;
      const categoriFilter = this.categoriFilter.map(
        (category) => `category:${category}`
      );
      const searchOptions = {
        ...this.requestOptions,
        facetFilters: [categoriFilter, 'public:true'],
      };

      setTimeout(
        () => {
          this.searchService
            .getPostWithUser(this.searchQuery, searchOptions, this.sort)
            .then(async (result) => {
              const items = await result.pipe(take(1)).toPromise();
              this.posts.push(...items);
            })
            .finally(() => (this.loading = false))
            .then();
        },
        this.isInit ? 0 : 500
      );
    }
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
    if (!this.loading) {
      this.requestOptions.page++;
      this.search();
    }
  }
}
