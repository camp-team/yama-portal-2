import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapLargeComponent } from './google-map-large/google-map-large.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GoogleMapLargeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
