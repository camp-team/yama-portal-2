import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageUploadDialogComponent } from './dialogs/image-upload-dialog/image-upload-dialog.component';
import { UserAvaterComponent } from './dialogs/user-avatar/user-avater.component';
import { PostCardComponent } from './post-card/post-card.component';
import { GoogleMapSmallComponent } from './google-map-small/google-map-small.component';
import { GoogleMapLargeComponent } from './google-map-large/google-map-large.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedRoutingModule } from './shared-routing.module';
import { CreditCardComponent } from './dialogs/credit-card/credit-card.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    FilterComponent,
    UserAvaterComponent,
    ImageUploadDialogComponent,
    PostCardComponent,
    GoogleMapSmallComponent,
    GoogleMapLargeComponent,
    CreditCardComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule,
    MatRadioModule,
    ImageCropperModule,
    GoogleMapsModule,
  ],
  exports: [
    FilterComponent,
    PostCardComponent,
    GoogleMapSmallComponent,
    GoogleMapSmallComponent,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
  ],
})
export class SharedModule {}
