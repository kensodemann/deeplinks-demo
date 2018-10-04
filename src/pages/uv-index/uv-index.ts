import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { UserPreferencesComponent } from '../../components/user-preferences/user-preferences';
import { UserPreferencesProvider } from '../../providers/user-preferences/user-preferences';
import { UVIndex } from '../../models/uv-index';
import { WeatherProvider } from '../../providers/weather/weather';

@IonicPage()
@Component({
  selector: 'page-uv-index',
  templateUrl: 'uv-index.html'
})
export class UVIndexPage {
  uvIndex: UVIndex;

  private subscription: Subscription;

  advice: Array<string> = [
    'Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen. ' +
      'Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Stay in the shade near midday when the sun is strongest. If outdoors, wear sun protective clothing, ' +
      'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, ' +
      'even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, ' +
      'and after swimming or sweating. Bright surfaces, such sand, water and snow, will increase UV exposure.',
    'Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after ' +
      'swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, ' +
      'and after swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.'
  ];

  constructor(
    private modal: ModalController,
    private userPreferences: UserPreferencesProvider,
    private weather: WeatherProvider
  ) {}

  ionViewDidLoad() {
    this.subscription = this.userPreferences.changed.subscribe(() =>
      this.getData()
    );
  }

  ionViewDidEnter() {
    this.getData();
  }

  ionViewWillUnload() {
    this.subscription.unsubscribe();
  }

  openUserPreferences() {
    const m = this.modal.create(UserPreferencesComponent);
    m.present();
  }

  private getData() {
    this.weather.uvIndex().subscribe(i => (this.uvIndex = i));
  }
}
