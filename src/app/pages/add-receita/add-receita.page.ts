import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { ActionSheetController } from '@ionic/angular';
import { Receita } from './../../model/receita';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ReceitaService } from 'src/app/services/receita.service';

@Component({
  selector: 'app-add-receita',
  templateUrl: './add-receita.page.html',
  styleUrls: ['./add-receita.page.scss'],
})
export class AddReceitaPage implements OnInit {

  protected receita: Receita = new Receita;
  
  constructor(
    private receitaService: ReceitaService,
    private msg:MensagemService,
    private router:Router,
    private camera:Camera,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }


onSubmit(form) {
  //console.log(this.usuario);
  this.msg.presentLoading()
  this.receitaService.add(this.receita).then(
    res => {
      //console.log("Cadastrado! ", res);
      this.msg.dismissLoading()
      this.msg.presentAlert("OK, ok!", "Cadastrado com sucesso!");
      this.receita = new Receita;
      form.reset();
      this.router.navigate(['']);
    },
    erro => {
      console.log("Erro: ", erro);
      this.msg.dismissLoading()
      this.msg.presentAlert("Ops!", "Erro ao tentar cadastrar!\nVerique os dados ou se o e-mail já foi cadastrado!");
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
   this.receita.foto = base64Image;
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
        this.receita.foto = null;
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
pegarFoto(){
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
   this.receita.foto = base64Image;
  }, (err) => {
   // Handle error
  });
}




}
