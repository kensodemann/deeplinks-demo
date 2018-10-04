import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForecastPage } from './forecast';

@NgModule({
  declarations: [ForecastPage],
  imports: [IonicPageModule.forChild(ForecastPage)],
  entryComponents: [ForecastPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForecastPageModule {}
