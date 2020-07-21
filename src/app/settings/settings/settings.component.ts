import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(userService: UserService, authService: AuthService) {}

  ngOnInit(): void {
    console.log('check');
  }

  onClick() {
    console.log('check');
  }
}
