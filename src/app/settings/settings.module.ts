import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormRoutingModule } from '../form/form-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    FormsModule,
    FormRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class SettingsModule {}
