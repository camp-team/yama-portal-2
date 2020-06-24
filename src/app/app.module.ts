import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgAisModule } from 'angular-instantsearch';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ImageCropperDialogComponent } from './image-cropper-dialog/image-cropper-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, ImageCropperDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSidenavModule,
    MatSnackBarModule,
    NgAisModule.forRoot(),
    MatButtonModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ImageCropperModule,
  ],
  providers: [{ provide: REGION, useValue: 'asia-northeast1' }],
  bootstrap: [AppComponent],
  entryComponents: [ImageCropperDialogComponent],
})
export class AppModule {}
