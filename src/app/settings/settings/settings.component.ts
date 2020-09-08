import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserAvaterComponent } from 'src/app/shared/dialogs/user-avatar/user-avater.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  uid: string = this.authService.userId;
  user$: Observable<User> = this.userService.getUserByUid(this.uid);
  imageChengedEvent: any = '';
  croppedImage: any = '';
  nameForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(25),
  ]);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  chengeUserName(): Promise<void> {
    const newUserName = this.nameForm.value;
    return this.userService
      .changeUserName(this.uid, newUserName)
      .then(() => {
        this.snackBar.open('変更されました', null, {
          duration: 3000,
        });
        this.nameForm.reset();
      })
      .catch(() => {
        this.snackBar.open('変更に失敗しました', null, {
          duration: 3000,
        });
      });
  }

  openUserAvaterDialog() {
    this.dialog.open(UserAvaterComponent);
  }
}
