import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { IconMapProvider } from '../../providers/icon-map/icon-map';
import { UserPreferencesComponent } from '../../components/user-preferences/user-preferences';
import { UserPreferencesProvider } from '../../providers/user-preferences/user-preferences';
import { Weather } from '../../models/weather';
import { WeatherProvider } from '../../providers/weather/weather';

@IonicPage()
@Component({
  selector: 'page-current-weather',
  templateUrl: 'current-weather.html'
})
export class CurrentWeatherPage {
  scale: string;
  cityName: string;
  currentWeather: Weather;

  private subscription: Subscription;

  constructor(
    public iconMap: IconMapProvider,
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
    this.userPreferences.getCity().then(c => (this.cityName = c.name));
    this.userPreferences.getUseCelcius().then(u => {
      this.scale = u ? 'C' : 'F';
    });
    this.weather.current().subscribe(w => (this.currentWeather = w));
  }
}
