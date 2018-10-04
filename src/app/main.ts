import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from 'kws-weather-widgets';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
defineCustomElements(window);
