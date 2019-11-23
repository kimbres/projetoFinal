import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{ AngularFireDatabaseModule } from "@angular/fire/database"

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
<<<<<<< HEAD
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
=======
    AngularFireModule.initializeApp(environment.firebaseConfig)
>>>>>>> 557ec937a0678fcd0b4f8214f6e433c07b022b45
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
