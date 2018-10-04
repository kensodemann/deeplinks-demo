import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { City } from '../../models/city';
import { cities } from './cities';

@Injectable()
export class UserPreferencesProvider {
  private keys = {
    useCelcius: 'useCelcius',
    city: 'city'
  };
  private _city: City;
  private _useCelcius: boolean;

  changed: Subject<void>;

  constructor(private storage: Storage) {
    this.changed = new Subject();
  }

  async getUseCelcius(): Promise<boolean> {
    await this.storage.ready();
    if (this._useCelcius === undefined) {
      this._useCelcius = await this.storage.get(this.keys.useCelcius);
    }
    return this._useCelcius;
  }

  async setUseCelcius(value: boolean): Promise<void> {
    await this.storage.ready();
    this._useCelcius = value;
    this.changed.next();
    this.storage.set(this.keys.useCelcius, value);
  }

  async getCity(): Promise<City> {
    await this.storage.ready();
    if (!this._city) {
      const city = await this.storage.get(this.keys.city);
      this._city = cities.find(c => c.name === (city && city.name)) || cities[0];
    }
    return this._city;
  }

  async setCity(city: City): Promise<void> {
    await this.storage.ready();
    this._city = cities.find(c => c.name === city.name) || cities[0];
    this.changed.next();
    this.storage.set(this.keys.city, city);
  }

  availableCities(): Array<City> {
    return cities;
  }
}
