import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { ComponentsModule } from '../components/components.module';

import { Deeplinks } from '@ionic-native/deeplinks';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IconMapProvider } from '../providers/icon-map/icon-map';
import { WeatherProvider } from '../providers/weather/weather';
import { LocationProvider } from '../providers/location/location';
import { UserPreferencesProvider } from '../providers/user-preferences/user-preferences';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    Deeplinks,
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    IconMapProvider,
    LocationProvider,
    UserPreferencesProvider,
    WeatherProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
