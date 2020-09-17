import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { FormGuard } from '../guards/form.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FormComponent,
    canDeactivate: [FormGuard],
    children: [
      {
        path: ':id',
        component: FormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
