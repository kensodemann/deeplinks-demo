import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, Tabs } from 'ionic-angular';
import { Deeplinks } from '@ionic-native/deeplinks';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = 'CurrentWeatherPage';
  tab2Root = 'ForecastPage';
  tab3Root = 'UVIndexPage';

  @ViewChild('myTabs')
  tabs: Tabs;

  constructor(private deeplinks: Deeplinks, private platform: Platform) {}

  ionViewDidLoad() {
    this.initializeDeepLinks();
  }

  private async initializeDeepLinks() {
    await this.platform.ready();
    if (this.platform.is('cordova')) {
      this.deeplinks
        .route({
          '/#': this.tab1Root,
          categories: this.tab2Root,
          ratings: this.tab3Root
        })
        .subscribe(
          match => {
            switch (match.$route) {
              case this.tab1Root:
                this.tabs.select(0);
                break;

              case this.tab2Root:
                this.tabs.select(1);
                break;

              case this.tab3Root:
                this.tabs.select(2);
                break;

              default:
                this.tabs.select(0);
                break;
            }
          },
          nomatch => {
            // nomatch.$link - the full link data
            console.error("Got a deeplink that didn't match", nomatch);
          }
        );
    }
  }
}
