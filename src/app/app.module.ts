import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { StartPage } from '../pages/start/start';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SeasonslistPage } from '../pages/seasonslist/seasonslist';
import { CartPage } from '../pages/cart/cart';
import { MycollectionPage } from '../pages/mycollection/mycollection';
import { MoviehomePage } from '../pages/moviehome/moviehome';
import { MoviesearchPage } from '../pages/moviesearch/moviesearch';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { NewcartPage } from '../pages/newcart/newcart';
import { FriendcollectionPage } from '../pages/friendcollection/friendcollection';
import { OtpPage } from '../pages/otp/otp';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HideHeaderDirective } from '../directives/hideheader/hideheader';
import { TmdbapiProvider } from '../providers/tmdbapi/tmdbapi';
import { TvapiProvider } from '../providers/tvapi/tvapi';
import { MovieapiProvider } from '../providers/movieapi/movieapi';
import { UtilsProvider } from '../providers/utils/utils';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AuthProvider } from '../providers/auth/auth';
import { Facebook } from "@ionic-native/facebook";


import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { OauthProvider } from '../providers/oauth/oauth';
import { FriendProvider } from '../providers/friend/friend';
import { ConfigProvider } from '../providers/config/config';
// const config: SocketIoConfig = { url: 'https://sltvsocket.herokuapp.com/', options: {} };
const config: SocketIoConfig = { url: 'http://localhost:4000/', options: {} };
import { SocketProvider } from '../providers/socket/socket';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { SubscriptionProvider } from '../providers/subscription/subscription';

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    HomePage,
    ListPage,
    OtpPage,
    CartPage,
    MycollectionPage,
    SeasonslistPage,
    MoviehomePage,
    MoviesearchPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    NewcartPage,
    FriendcollectionPage,
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
    StartPage,
    HomePage,
    MycollectionPage,
    ListPage,
    SignupPage,
    OtpPage,
    CartPage,
    MoviehomePage,
    NewcartPage,
    MoviesearchPage,
    LoginPage,    
    SeasonslistPage,
    ProfilePage,
    FriendcollectionPage
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
    AuthProvider,
    Facebook,
    OauthProvider,
    FriendProvider,
    ConfigProvider,
    SocketProvider,
    AuthenticationProvider,
    SubscriptionProvider
  ]
})
export class AppModule {}


