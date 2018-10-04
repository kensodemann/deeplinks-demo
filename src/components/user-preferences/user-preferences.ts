import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { City } from '../../models/city';
import { UserPreferencesProvider } from '../../providers/user-preferences/user-preferences';

@Component({
  selector: 'user-preferences',
  templateUrl: 'user-preferences.html'
})
export class UserPreferencesComponent {
  cities: Array<City>;
  city: City;
  useCelcius: boolean;

  constructor(
    private modal: ViewController,
    private userPreferences: UserPreferencesProvider
  ) {}

  async ionViewDidLoad() {
    this.cities = this.userPreferences.availableCities();
    this.city = await this.userPreferences.getCity();
    this.useCelcius = await this.userPreferences.getUseCelcius();
  }

  dismiss() {
    this.modal.dismiss();
  }

  save() {
    this.userPreferences.setUseCelcius(this.useCelcius);
    this.userPreferences.setCity(this.city);
    this.modal.dismiss();
  }
}
