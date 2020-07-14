import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { AuthService } from './services/auth.service';
import { DrawerService } from './services/drawer.service';
import { UiService } from './services/ui.service';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrap') private wrap: MatSidenavContent;
  mobileQuery: MediaQueryList;

  title = 'yama-portal';
  user$ = this.authService.user$;
  opened: boolean;

  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    private drawerService: DrawerService,
    private uiService: UiService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.drawerService.toggle();
    this.drawerService.isOpen$.subscribe((opened) => (this.opened = opened));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    this.uiService.scrollWrapperElement = this.wrap.getElementRef().nativeElement;
  }
}
