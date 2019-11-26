import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './model/usuario';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Cadastro',
      url: '/add-usuario',
      icon: 'list'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'list'
    }
  ];

  protected usuario : Usuario = new Usuario

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usuarioService : UsuarioService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ionViewWillEnter() {
    let login = this.usuarioService.afAuth.auth.currentUser;
    if (login) {
      this.usuarioService.get().subscribe(
        res => {
          if (res == null) {
            this.usuario = new Usuario;
          } else {
            this.usuario = res
          }
          this.usuario.email = login.email
          console.log(this.usuario)
        }
      )
    }
  }
}
