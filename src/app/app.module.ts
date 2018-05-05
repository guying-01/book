import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {MallPage} from '../pages/mall/mall';
import {MessagePage} from '../pages/message/message';
import {PersonalCenterPage} from '../pages/personal-center/personal-center';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {UserPage} from "../pages/user/user";
import {DetailPage} from "../pages/detail/detail";
import {ArticlePage} from '../pages/article/article';
import {BookmarkPage} from '../pages/bookmark/bookmark';
import {SharePage} from "../pages/share/share";
import {HeadfacePage} from "../pages/headface/headface";

import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from "@ionic/storage";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {RestProvider} from '../providers/rest/rest';

import { File } from '_@ionic-native_file@4.7.0@@ionic-native/file';
import { Transfer } from '_@ionic-native_transfer@3.14.0@@ionic-native/transfer';
import { FilePath } from '_@ionic-native_file-path@4.7.0@@ionic-native/file-path';
import { Camera } from '_@ionic-native_camera@4.7.0@@ionic-native/camera';
import { SettingProvider } from '../providers/setting/setting';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MallPage,
    MessagePage,
    PersonalCenterPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    DetailPage,
    ArticlePage,
    BookmarkPage,
    SharePage,
    HeadfacePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: "返回",
      backButtonColor: "#54deac"
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MallPage,
    MessagePage,
    PersonalCenterPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    DetailPage,
    ArticlePage,
    BookmarkPage,
    SharePage,
    HeadfacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    File,
    Transfer,
    FilePath,
    Camera,
    SettingProvider
  ]
})
export class AppModule {
}
