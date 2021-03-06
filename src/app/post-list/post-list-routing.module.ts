import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostListRoutingModule {}
