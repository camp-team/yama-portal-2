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
import { RadioService } from './services/radio.service';
import { Router } from '@angular/router';

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

  private mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    private drawerService: DrawerService,
    private uiService: UiService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private radioService: RadioService,
    private router: Router
  ) {
    this.drawerService.toggle();
    this.drawerService.isOpen$.subscribe((opened) => (this.opened = opened));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }
  navigate() {
    this.radioService.radioControl.patchValue(null);
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    this.uiService.scrollWrapperElement = this.wrap.getElementRef().nativeElement;
  }
}
