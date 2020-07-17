import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';
import { Post, PostWithUser } from '../interfaces/post';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  index = {
    posts: searchClient.initIndex('posts'),
    Latest: searchClient.initIndex('Latest'),
    Oldest: searchClient.initIndex('Oldest'),
  };

  constructor(private userService: UserService) {}

  async getPostWithUser(
    searchQuery,
    searchoptions,
    sortKey: string = 'posts'
  ): Promise<Observable<PostWithUser[]>> {
    const result = await this.index[sortKey].search(searchQuery, searchoptions);
    const posts = result.hits as any[];
    const maxPage: number = result.nbPages;
    if (posts.length) {
      const uids: string[] = posts.map((item: Post) => item.userId);
      const uniquedUserIds: string[] = Array.from(new Set(uids));

      const userObservables$: Observable<User>[] = uniquedUserIds.map((uid) =>
        this.userService.getUserByUid(uid).pipe(filter((user) => Boolean(user)))
      );
      const users$: Observable<User[]> = combineLatest(userObservables$);

      return combineLatest([of(posts), users$]).pipe(
        map(([items, users]) => {
          return items.map((item) => {
            return {
              ...item,
              user: users.find((user) => item.userId === user.uid),
            };
          });
        })
      );
    } else {
      return of([]);
    }
  }
}
