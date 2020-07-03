import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';

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
    item: searchClient.initIndex('items'),
    // アイテムインデックス（価格順）
    itemPrice: searchClient.initIndex('items_price'),
    // ユーザーインデックス
    user: searchClient.initIndex('user'),
  };

  constructor() {}
}
