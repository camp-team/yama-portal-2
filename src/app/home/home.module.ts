import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { NgAisModule } from 'angular-instantsearch';
import { VisibleDirective } from '../post-list/visible.directive';

@NgModule({
  declarations: [HomeComponent, VisibleDirective],
  imports: [CommonModule, HomeRoutingModule, MatIconModule, NgAisModule],
})
export class HomeModule {}
