import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-avater',
  templateUrl: './user-avater.component.html',
  styleUrls: ['./user-avater.component.scss'],
})
export class UserAvaterComponent implements OnInit {
  uid: string = this.authService.userId;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  changeFileEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  croppeImage(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }
  failedLoadImage(selectedImage): void {
    alert('画像の読み込みに失敗しました');
    selectedImage.value = '';
    this.imageChangedEvent = '';
  }
  resetImage(selectedImage): void {
    selectedImage.value = '';
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }

  changeUserAvater(selectedImage): Promise<void> {
    return this.userService
      .changeUserAvater(this.uid, this.croppedImage)
      .then(() => {
        this.snackBar.open('変更されました', null, {
          duration: 3000,
        });
        selectedImage.value = '';
        this.imageChangedEvent = '';
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null, {
          duration: 3000,
        });
      });
  }
}
