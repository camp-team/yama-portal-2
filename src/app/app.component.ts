import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'yama-portal';
  user$ = this.authService.afUser$;
  opened: boolean;

  constructor(
    private authService: AuthService,
    private drawerService: DrawerService
  ) {
    this.drawerService.toggle();
    this.drawerService.isOpen$.subscribe((opened) => (this.opened = opened));
  }

  login() {
    this.authService.Googlelogin();
    console.log(this.user$);
  }

  logout() {
    this.authService.logout();
  }
}
