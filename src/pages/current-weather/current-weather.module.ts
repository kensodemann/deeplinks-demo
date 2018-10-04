import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentWeatherPage } from './current-weather';

@NgModule({
  declarations: [CurrentWeatherPage],
  imports: [IonicPageModule.forChild(CurrentWeatherPage)],
  entryComponents: [CurrentWeatherPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CurrentWeatherPageModule {}
