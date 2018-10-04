import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { UserPreferencesComponent } from './user-preferences/user-preferences';
@NgModule({
  declarations: [UserPreferencesComponent],
  entryComponents: [UserPreferencesComponent],
  imports: [IonicModule],
  exports: [UserPreferencesComponent]
})
export class ComponentsModule {}
