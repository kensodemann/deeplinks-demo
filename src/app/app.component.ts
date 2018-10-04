import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage: any = 'TabsPage';

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    this.statusBar.styleLightContent();
    this.splashScreen.hide();
    if (this.platform.is('android')) {
      this.statusBar.backgroundColorByHexString('#06487F');
    }
  }
}
