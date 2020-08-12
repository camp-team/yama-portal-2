import { Component, OnInit, ViewChild } from '@angular/core';
import { MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-google-map-small',
  templateUrl: './google-map-small.component.html',
  styleUrls: ['./google-map-small.component.scss'],
})
export class GoogleMapSmallComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  zoom = 14;
  center: google.maps.LatLngLiteral = {
    lat: 34.863439,
    lng: 139.001569,
  };
  // 地図のオプション
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
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
  constructor() {}

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

  // 現在位置マーカーがクリックされた時のハンドラー
  onCurrentPositionMarkerClick(marker: MapMarker) {
    // 地図をマーカーの座標までパンさせる。
    console.log(this.currentPosition);
    console.log(this.map);
    console.log(marker.getPosition());
    this.map.panTo(marker.getPosition());
  }
}
