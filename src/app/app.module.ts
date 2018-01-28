import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SeasonslistPage } from '../pages/seasonslist/seasonslist';
import { CartPage } from '../pages/cart/cart';
import { MoviehomePage } from '../pages/moviehome/moviehome';
import { MoviesearchPage } from '../pages/moviesearch/moviesearch';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HideHeaderDirective } from '../directives/hideheader/hideheader';
import { TmdbapiProvider } from '../providers/tmdbapi/tmdbapi';
import { TvapiProvider } from '../providers/tvapi/tvapi';
import { MovieapiProvider } from '../providers/movieapi/movieapi';
import { UtilsProvider } from '../providers/utils/utils';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AuthProvider } from '../providers/auth/auth';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'https://sltvsocket.herokuapp.com/', options: {} };
// const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CartPage,
    SeasonslistPage,
    MoviehomePage,
    MoviesearchPage,
    LoginPage,
    HideHeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CartPage,
    MoviehomePage,
    MoviesearchPage,
    LoginPage,    
    SeasonslistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TmdbapiProvider,
    TvapiProvider,
    MovieapiProvider,
    UtilsProvider,
    AuthServiceProvider,
    AuthProvider
  ]
})
export class AppModule {}


