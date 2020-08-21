import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map-large',
  templateUrl: './google-map-large.component.html',
  styleUrls: ['./google-map-large.component.scss'],
})
export class GoogleMapLargeComponent implements OnInit {
  zoom = 15;
  center: google.maps.LatLngLiteral = {
    lat: 34.863439,
    lng: 139.001569,
  };
  // 地図のオプション
  options: google.maps.MapOptions = {
    disableDefaultUI: false,
  };

  // 現在位置マーカーの座標
  currentPosition: google.maps.LatLngLiteral;
  // 現在位置マーカーのオプション
  currentPositionMarkerOption: google.maps.MarkerOptions = {
    icon: {
      url: 'assets/icons/place-black-18dp/2x/baseline_place_black_18dp.png',
      scaledSize: new google.maps.Size(32, 32),
    },
  };
  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

  ngOnInit(): void {}
}
