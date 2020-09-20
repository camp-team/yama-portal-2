import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-google-map-large',
  templateUrl: './google-map-large.component.html',
  styleUrls: ['./google-map-large.component.scss'],
})
export class GoogleMapLargeComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap, { static: false }) map: google.maps.Map;

  zoom = 14;
  center: google.maps.LatLngLiteral = {
    lat: 34.863439,
    lng: 139.001569,
  };
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };
  currentPosition: google.maps.LatLngLiteral;
  currentPositionMarkerOption = { draggable: false };

  posts$: Observable<Post[]> = this.postService.getPosts();
  markerOptions = { draggable: false };

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
  }

  ngAfterViewInit(): void {
    this.map.data.loadGeoJson('assets/amagiTrail.geojson');

    this.map.data.setStyle({
      strokeColor: '#3471B8',
      strokeWeight: 5,
      strokeOpacity: 0.6470588235294118,
    });
  }

  panToCenter() {
    this.map.panTo(this.center);
  }

  panToCurrentPosition() {
    this.map.panTo(this.currentPosition);
  }

  clickToHome() {
    this.router.navigate(['/']);
  }

  clickToForm() {
    this.router.navigate(['/form']);
  }

  onCurrentPositionMarkerClicked() {
    this.map.panTo(this.currentPosition);
  }

  markerClicked(marker: MapMarker, window: MapInfoWindow) {
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
