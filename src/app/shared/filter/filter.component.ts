import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectionListChange, MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  private index = this.searchService.index.posts;
  uplaodAtFilter = new FormControl('');
  categories: {
    value: string;
    highlighted: string;
    count: number;
    selected?: boolean;
  }[];

  visible: boolean;

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
    this.buildCategories();
  }

  private buildCategories() {
    this.index.searchForFacetValues('category', '').then((res) => {
      this.categories = res.facetHits;
    });
  }

  toggle() {
    this.visible = !this.visible;
  }

  buildQueryParameterByCategories(event: MatRadioChange) {
    const option = event.source.value;
    const categoriesFilter = option || null;
    this.router.navigate([''], {
      queryParams: {
        categories: categoriesFilter,
      },
      queryParamsHandling: 'merge',
    });
  }

  buildQueryParameterBySort(event: MatSelectionListChange) {
    const key: MatListOption = event.source.selectedOptions.selected[0].value;
    this.router.navigate([''], {
      queryParams: {
        sort: key,
      },
      queryParamsHandling: 'merge',
    });
  }
}
