import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'legal',
    loadChildren: () =>
      import('./legal/legal.module').then((m) => m.LegalModule),
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./terms/terms.module').then((m) => m.TermsModule),
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./post-list/post-list.module').then((m) => m.PostListModule),
  },
  {
    path: 'Login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canLoad: [GuestGuard],
    canActivate: [GuestGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'post-detail',
    loadChildren: () =>
      import('./post-detail/post-detail.module').then(
        (m) => m.PostDetailModule
      ),
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('./billing/billing.module').then((m) => m.BillingModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
