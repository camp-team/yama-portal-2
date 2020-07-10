import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { AuthService } from './services/auth.service';
import { DrawerService } from './services/drawer.service';
import { UiService } from './services/ui.service';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('wrap') private wrap: MatSidenavContent;

  title = 'yama-portal';
  user$ = this.authService.afUser$;
  opened: boolean;

  constructor(
    private authService: AuthService,
    private drawerService: DrawerService,
    private uiService: UiService
  ) {
    this.drawerService.toggle();
    this.drawerService.isOpen$.subscribe((opened) => (this.opened = opened));
    console.log('test');
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    this.uiService.scrollWrapperElement = this.wrap.getElementRef().nativeElement;
    console.log(this.uiService.scrollWrapperElement);
  }
}
