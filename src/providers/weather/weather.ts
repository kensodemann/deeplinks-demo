import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { LocationProvider } from '../location/location';
import { UserPreferencesProvider } from '../user-preferences/user-preferences';

import { Forecast } from '../../models/forecast';
import { Location } from '../../models/location';
import { UVIndex } from '../../models/uv-index';
import { Weather } from '../../models/weather';

@Injectable()
export class WeatherProvider {
  private appId = 'db046b8bbe642b799cb40fa4f7529a12';
  private baseUrl = 'http://api.openweathermap.org/data/2.5';

  constructor(
    private http: HttpClient,
    private location: LocationProvider,
    private userPreferences: UserPreferencesProvider
  ) {}

  current(): Observable<Weather> {
    return this.getCurrentLocation().pipe(
      flatMap((loc: Location) =>
        this.getCurrentWeather(loc.latitude, loc.longitude)
      )
    );
  }

  forecast(): Observable<Forecast> {
    return this.getCurrentLocation().pipe(
      flatMap((loc: Location) =>
        this.getWeatherForecast(loc.latitude, loc.longitude)
      )
    );
  }

  uvIndex(): Observable<UVIndex> {
    return this.getCurrentLocation().pipe(
      flatMap((loc: Location) => this.getUVIndex(loc.latitude, loc.longitude))
    );
  }

  private getCurrentWeather(
    latitude: number,
    longitude: number
  ): Observable<Weather> {
    return this.http
      .get(
        `${this.baseUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${
          this.appId
        }`
      )
      .pipe(map((res: any) => this.unpackWeather(res)));
  }

  private getWeatherForecast(
    latitude: number,
    longitude: number
  ): Observable<Forecast> {
    return this.http
      .get(
        `${this.baseUrl}/forecast?lat=${latitude}&lon=${longitude}&appid=${
          this.appId
        }`
      )
      .pipe(map((res: any) => this.unpackForecast(res)));
  }

  private getUVIndex(latitude: number, longitude: number): Observable<UVIndex> {
    return this.http
      .get(
        `${this.baseUrl}/uvi?lat=${latitude}&lon=${longitude}&appid=${
          this.appId
        }`
      )
      .pipe(map((res: any) => this.unpackUVIndex(res)));
  }

  private getCurrentLocation(): Observable<Location> {
    return Observable.fromPromise(
      this.userPreferences.getCity().then(c => {
        if (c.location) {
          return c.location;
        } else {
          return this.location.current();
        }
      })
    );
  }

  private unpackForecast(res: any): Forecast {
    let currentDay: Array<Weather>;
    let prevDate: number;
    const forecast: Forecast = [];

    res.list.forEach(item => {
      const w = this.unpackWeather(item);
      if (w.date.getDate() !== prevDate) {
        prevDate = w.date.getDate();
        currentDay = [];
        forecast.push(currentDay);
      }
      currentDay.push(w);
    });

    return forecast;
  }

  private unpackUVIndex(res: any): UVIndex {
    const level = this.riskLevel(res.value);
    return {
      value: res.value,
      riskLevel: level
    };
  }

  private unpackWeather(res: any): Weather {
    return {
      temperature: res.main.temp,
      condition: res.weather[0].id,
      date: new Date(res.dt * 1000)
    };
  }

  private riskLevel(value: number) {
    if (value < 3) {
      return 0;
    }
    if (value < 6) {
      return 1;
    }
    if (value < 8) {
      return 2;
    }
    if (value < 11) {
      return 3;
    }
    return 4;
  }
}
