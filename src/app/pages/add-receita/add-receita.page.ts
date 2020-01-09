import { ReceitaService } from './../../services/receita.service';
import { Component, OnInit } from '@angular/core';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Receita } from './../../model/receita';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation,
  LocationService,

} from '@ionic-native/google-maps';


@Component({
  selector: 'app-add-receita',
  templateUrl: './add-receita.page.html',
  styleUrls: ['./add-receita.page.scss'],
})

export class AddReceitaPage implements OnInit {

  protected receita: Receita = new Receita;
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 4,
    speed: 400
  };
  constructor(
    private receitaService: ReceitaService,
    private msg: MensagemService,
    private router: Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private geolocation: Geolocation,
    private platform: Platform,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
    this.receita.fotos = null
  }

  onSubmit(form) {
    //console.log(this.produto);
    this.msg.presentLoading()
    this.receitaService.add(this.receita).then(
      res => {
        //console.log("Cadastrado! ", res);

        this.receita = new Receita;
        form.reset();
        this.msg.dismissLoading();

        this.router.navigate(['']);
      },
      erro => {
        console.log("Erro: ", erro);
        this.msg.dismissLoading()
        this.msg.presentAlert("Ops!", "Erro ao tentar cadastrar!\nVerique os dados ou se o e-mail já foi cadastrado!");
      }
    )
    console.log(form.tags);
    form.tags = this.tagArrayToString(form.tags);
    console.log(form.tags);
  }

  //Fotos ------------------------------------------  
  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (this.receita.fotos == null) {
        this.receita.fotos = []
      }
      this.receita.fotos.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  pegarFoto() {
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (this.receita.fotos == null) {
        this.receita.fotos = []
      }
      this.receita.fotos.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Receita Cadastrada com sucesso!.',
      duration: 2000
    });
    toast.present();
  }

  async escolherFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolhar Opção',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.tirarFoto()
          }
        },
        {
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.pegarFoto()
          }
        },
        {
          text: 'Remover Foto',
          icon: 'qr-scanner',
          handler: () => {
            this.receita.fotos = null;
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  async removerFoto(index) {
    const alert = await this.msg.alertController.create({
      header: 'Confirmar!',
      message: 'Deseja apagar a ' + (index + 1) + 'ª foto?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.receita.fotos.splice(index, 1)
            if (this.receita.fotos[0] == null)
              this.receita.fotos = null
          }
        }
        ,
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
        }]
    });
    await alert.present();
  }

  //Google Maps ------------------------------------------
  map: GoogleMap;
  local = { lat: 43.0741904, lng: -89.3809802 };

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.local.lat,
          lng: this.local.lng
        },
        zoom: 18,
        tilt: 30
      }
    }

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.minhaLocalizacao()

    this.adicionarPonto("blue", "VOCÊ", this.local);

    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      p => {
        this.adicionarPonto("red", "receita", p[0])
        console.log(p[0]);
      }
    )
  }

  minhaLocalizacao() {
    LocationService.getMyLocation().then(
      (myLocation: MyLocation) => {
        this.local = myLocation.latLng
        console.log(this.local);
        this.map.setOptions({
          camera: {
            target: myLocation.latLng
          }
        })
      })
  }

  adicionarPonto(cor: string, nome: string, local: any) {
    let marker: Marker = this.map.addMarkerSync({
      title: nome,
      icon: cor,
      animation: 'DROP',
      position: local
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert(nome);
    });
  }

  // Tags

  tagArrayToString(tagArray: string[]): string {
    if (Array.isArray(tagArray) && tagArray.length > 0) {
      const tags = tagArray.map((e: any) => `[${e.value}]`);
      const tagString = tags.join();
      return tagString;
    } else {
      return '';
    }
  }

}