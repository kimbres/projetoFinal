import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Restaurante } from 'src/app/model/restaurante';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation,
  LocationService
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-add-restaurante',
  templateUrl: './add-restaurante.page.html',
  styleUrls: ['./add-restaurante.page.scss'],
})
export class AddRestaurantePage implements OnInit {

  protected restaurante: Restaurante = new Restaurante;
  private id: string;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 4,
    speed: 400
  }

  constructor(
    private restauranteService: RestauranteService,
    private msg: MensagemService,
    private router: Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private geolocation: Geolocation,
    private platform: Platform,
    private ativeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }
  ionViewWillEnter() {
    this.id = this.ativeRouter.snapshot.paramMap.get("id")
    if (this.id) {
      this.restaurante = new Restaurante
      this.restauranteService.get(this.id).subscribe(
        res => {
          this.restaurante = res
        }
      )
    }
  }

  onSubmit(form) {
    //console.log(this.restaurante);
    this.msg.presentLoading()
    if (this.id) {
      this.restauranteService.update(this.restaurante, this.id).then(
        res => {
          //console.log("Atualizado! ", res);
          this.msg.dismissLoading()
          this.msg.presentAlert("OK, ok!", "Atualizado com sucesso!");
          this.restaurante = new Restaurante;
          form.reset();
          this.router.navigate(['']);
        },
        erro => {
          console.log("Erro: ", erro);
          this.msg.dismissLoading()
          this.msg.presentAlert("Ops!", "Erro ao tentar atualizar!");
        }
      )
    } else {
      this.restauranteService.add(this.restaurante).then(
        res => {
          //console.log("Cadastrado! ", res);
          this.msg.dismissLoading()
          this.msg.presentAlert("OK, ok!", "Cadastrado com sucesso!");
          this.restaurante = new Restaurante;
          form.reset();
          this.router.navigate(['']);
        },
        erro => {
          console.log("Erro: ", erro);
          this.msg.dismissLoading()
          this.msg.presentAlert("Ops!", "Erro ao tentar cadastrar!");
        }
      )
    }
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
      if (this.restaurante.fotos == null) {
        this.restaurante.fotos = []
      }
      this.restaurante.fotos.push(base64Image);
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
      if (this.restaurante.fotos == null) {
        this.restaurante.fotos = []
      }
      this.restaurante.fotos.push(base64Image);
    }, (err) => {
      // Handle error
    });
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
            this.restaurante.fotos = null;
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
            this.restaurante.fotos.splice(index, 1)
            if (this.restaurante.fotos[0] == null)
              this.restaurante.fotos = null
          }
        },
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    })
    await alert.present()
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
        this.adicionarPonto("red", "restaurante", p[0])
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
}