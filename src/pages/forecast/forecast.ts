import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { Forecast } from '../../models/forecast';
import { IconMapProvider } from '../../providers/icon-map/icon-map';
import { UserPreferencesComponent } from '../../components/user-preferences/user-preferences';
import { UserPreferencesProvider } from '../../providers/user-preferences/user-preferences';
import { WeatherProvider } from '../../providers/weather/weather';

@IonicPage()
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html'
})
export class ForecastPage {
  scale: string;
  forecast: Forecast;

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
    this.userPreferences.getUseCelcius().then(u => {
      this.scale = u ? 'C' : 'F';
    });
    this.weather.forecast().subscribe(f => (this.forecast = f));
  }
}
