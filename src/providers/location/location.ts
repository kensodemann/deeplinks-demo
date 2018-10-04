import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { Location } from '../../models/location';

@Injectable()
export class LocationProvider {
  private defaultLocation: Location = {
    latitude: 43.073051,
    longitude: -89.40123
  };

  constructor(private geolocation: Geolocation, private platform: Platform) {}

  current(): Promise<Location> {
    if (this.platform.is('cordova')) {
      return this.geolocation.getCurrentPosition().then(loc => ({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      }));
    } else {
      return Promise.resolve(this.defaultLocation);
    }
  }
}
