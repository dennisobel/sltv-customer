import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MoviehomePage } from '../pages/moviehome/moviehome';
import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';
import { MycollectionPage } from '../pages/mycollection/mycollection';
import { ProfilePage } from '../pages/profile/profile';
import { StorePage } from '../pages/store/store';
import { CartPage } from '../pages/cart/cart';
import {SocketProvider} from '../providers/socket/socket'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;

  pages: Array<{title: string, icon:any, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public socketProvider: SocketProvider) {
    this.initializeApp();

    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'TV Series', icon:'desktop', component: HomePage },
      { title: 'Movies', icon:'film', component: MoviehomePage },
      { title: 'My Collection', icon:'albums', component: MycollectionPage },
      { title: 'Profile', icon:'contact', component: ProfilePage },
      { title: 'Cart', icon:'cart', component: CartPage},
      // { title: 'Pick Store', icon:'business', component: StorePage}
    ];

  }

  initializeApp() {
    /*
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    */
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component,{from:'apphtml'});
  }
}
