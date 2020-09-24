import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserAvaterComponent } from 'src/app/shared/dialogs/user-avatar/user-avater.component';
import { DeleteComponent } from 'src/app/shared/dialogs/delete/delete.component';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';

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
    private dialog: MatDialog,
    private fns: AngularFireFunctions,
    private router: Router
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

  openDeleteDialog() {
    this.dialog
      .open(DeleteComponent)
      .afterClosed()
      .subscribe((status) => {
        if (status) {
          this.deleteUser(this.uid).then(() => {
            this.snackBar.open(
              'アカウントを削除しました、反映には時間がかかります',
              null,
              {
                duration: 5000,
              }
            );
            this.router.navigateByUrl('/');
          });
        }
      });
  }

  deleteUser(uid: string) {
    const callable = this.fns.httpsCallable('deleteUser');
    return callable(uid).toPromise();
  }
}
