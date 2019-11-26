import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {


  protected usuario: Usuario = new Usuario;

  constructor(
    private usuarioService:UsuarioService,
    private msg:MensagemService,
    private router:Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController

  ) { }

  ngOnInit() {
  }

  onSubmit (form){ 
    console.log(this.usuario);
    this.usuarioService.add(this.usuario).then(
      res=>{
        //console.log("Cadastrado!", res);
        this.msg.presentAlert("Aviso","Cadastrado com Sucesso!");
        this.usuario = new Usuario;
        form.reset();
        this.router.navigate(['']);
      }, 
      erro=>{
        console.log("Erro: ", erro);
        this.msg.presentAlert("Ops!","Erro ao tentar cadastrar.Verifique se o email já foi cadastrado!");
      }
    )
  }

  tirarFoto(){
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
     this.usuario.foto = base64Image;
    }, (err) => {
     // Handle error
    });
  }

  pegarFoto(){
    const options: CameraOptions = {
      quality: 50,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.usuario.foto = base64Image;
    }, (err) => {
     // Handle error
    });
  }

  async escolherFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.tirarFoto()
        }
      }, {
        text: 'Galeria',
        icon: 'photos',
        handler: () => {
          this.pegarFoto()
        }
      },{
        text: 'Remover Foto',
        icon: 'qr-scanner',
        handler: () => {
          this.usuario.foto = null;
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}

