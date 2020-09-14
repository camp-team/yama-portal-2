import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { MapMarker, GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { PostService } from 'src/app/services/post.service';
import { Observable } from 'rxjs';
import { Post, PostWithUser } from 'src/app/interfaces/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-map-small',
  templateUrl: './google-map-small.component.html',
  styleUrls: ['./google-map-small.component.scss'],
})
export class GoogleMapSmallComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap, { static: false }) map: google.maps.Map;
  @Input() post: PostWithUser;

  public zoom = 14;
  public center: google.maps.LatLngLiteral = {
    lat: 34.863439,
    lng: 139.001569,
  };
  public options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };
  public currentPosition: google.maps.LatLngLiteral;
  public currentPositionMarkerOption = { draggable: false };

  public posts$: Observable<Post[]> = this.postService.getPosts();
  public markerOptions = { draggable: false };

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
    if (!!this.post) {
      if (this.post.currentPosition) {
        this.center = this.post.currentPosition;
      } else {
        return;
      }
    }
  }

  ngAfterViewInit(): void {
    this.map.data.loadGeoJson('assets/amagiTrail.geojson');

    this.map.data.setStyle({
      strokeColor: '#3471B8',
      strokeWeight: 5,
      strokeOpacity: 0.6470588235294118,
    });

    const fullscreenControlDiv = document.createElement('div');
    this.fullscreenControl(fullscreenControlDiv, this.map);

    fullscreenControlDiv.tabIndex = 1;

    this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      fullscreenControlDiv
    );
  }

  fullscreenControl(controlDiv: Element, map: google.maps.Map) {
    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.style.backgroundImage =
      'url(../assets/icons/fullscreen-black-18dp.svg)';
    controlUI.style.backgroundSize = 'contain';
    controlUI.style.position = 'absolute';
    controlUI.style.top = '8px';
    controlUI.style.right = '8px';
    controlUI.style.height = '32px';
    controlUI.style.width = '32px';
    controlUI.title = 'Click to fullscreen the map';
    controlDiv.appendChild(controlUI);

    controlUI.addEventListener('click', () => {
      this.router.navigate(['/map']);
    });
  }

  onCurrentPositionMarkerClick() {
    this.map.panTo(this.currentPosition);
  }

  openInfoWindow(marker: MapMarker, window: MapInfoWindow) {
    window.open(marker);
  }

  changeMarkerIcons(category: string) {
    switch (category) {
      case 'denger': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/denger.svg',
            scaledSize: new google.maps.Size(48, 48),
          },
        };
        return markerOptions;
      }
      case 'viewPoint': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/camera.svg',
            scaledSize: new google.maps.Size(48, 48),
          },
        };
        return markerOptions;
      }
      case 'toilet': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/wc.svg',
            scaledSize: new google.maps.Size(48, 48),
          },
        };
        return markerOptions;
      }
      case 'water': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/water.svg',
            scaledSize: new google.maps.Size(48, 48),
          },
        };
        return markerOptions;
      }
      case 'rest': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/rest.svg',
            scaledSize: new google.maps.Size(48, 48),
          },
        };
        return markerOptions;
      }
      case 'other': {
        const markerOptions: google.maps.MarkerOptions = {
          icon: {
            url: 'assets/icons/other.svg',
            scaledSize: new google.maps.Size(48, 48),
          },
        };
        return markerOptions;
      }
      default:
    }
  }
}
