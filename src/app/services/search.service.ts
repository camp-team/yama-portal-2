import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // インデックスリスト
  index = {
    // アイテムインデックス
    label: searchClient.initIndex('label'),
  };
  searchControl: FormControl = new FormControl('');

  constructor() {}
}
