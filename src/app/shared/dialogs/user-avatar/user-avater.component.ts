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
  imageChengedEvent: any = '';
  croppedImage: any = '';
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  fileChengeEvent(event: any): void {
    this.imageChengedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }
  loadImageFailed(selectedImage): void {
    alert('画像の読み込みに失敗しました');
    selectedImage.value = '';
    this.imageChengedEvent = '';
  }
  resetImage(selectedImage): void {
    selectedImage.value = '';
    this.imageChengedEvent = '';
    this.croppedImage = '';
  }

  chengeUserAvater(selectedImage): Promise<void> {
    return this.userService
      .changeUserAvater(this.uid, this.croppedImage)
      .then(() => {
        this.snackBar.open('変更されました', null, {
          duration: 3000,
        });
        selectedImage.value = '';
        this.imageChengedEvent = '';
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null, {
          duration: 3000,
        });
      });
  }
}
