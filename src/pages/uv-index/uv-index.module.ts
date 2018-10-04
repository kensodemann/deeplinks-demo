import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UVIndexPage } from './uv-index';

@NgModule({
  declarations: [UVIndexPage],
  imports: [IonicPageModule.forChild(UVIndexPage)],
  entryComponents: [UVIndexPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UVIndexPageModule {}
