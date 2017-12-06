import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MovielistPage } from '../pages/movielist/movielist';
import { MoviedetailPage } from '../pages/moviedetail/moviedetail';
import { PoolPage } from '../pages/pool/pool';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HideHeaderDirective } from '../directives/hideheader/hideheader';
import { TmdbapiProvider } from '../providers/tmdbapi/tmdbapi';
import { TvapiProvider } from '../providers/tvapi/tvapi';
import { MovieapiProvider } from '../providers/movieapi/movieapi';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MoviedetailPage,
    PoolPage,
    MovielistPage,
    HideHeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MoviedetailPage,
    PoolPage,
    MovielistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TmdbapiProvider,
    TvapiProvider,
    MovieapiProvider
  ]
})
export class AppModule {}


