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
    zoomControl: true,
    fullscreenControl: true,
  };
  public currentPosition: google.maps.LatLngLiteral;
  public currentPositionMarkerOption = { draggable: false };

  public posts$: Observable<Post[]> = this.postService.getPosts();
  public markerOptions = { draggable: false };

  constructor(private postService: PostService) {}

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
    const centerControlDiv = document.createElement('div');
    this.panToCenterControl(centerControlDiv, this.map);

    centerControlDiv.tabIndex = 1;

    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
      centerControlDiv
    );

    const currentPositionDiv = document.createElement('div');
    this.panToCurrentPositionControl(currentPositionDiv, this.map);

    currentPositionDiv.tabIndex = 1;

    this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
      currentPositionDiv
    );
  }

  panToCenterControl(controlDiv: Element, map: google.maps.Map) {
    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    const controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Center Map';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', () => {
      map.panTo(this.center);
    });
  }

  panToCurrentPositionControl(controlDiv: Element, map: google.maps.Map) {
    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to current the map';
    controlDiv.appendChild(controlUI);

    const controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Current';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', () => {
      this.onCurrentPositionMarkerClick();
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
