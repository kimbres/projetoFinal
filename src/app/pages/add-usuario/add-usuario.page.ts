import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private msg: MensagemService,
    private router:Router,
    private camera: Camera
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    //console.log(this.usuario);
    this.usuarioService.add(this.usuario).then(
      res => {
        //console.log("Cadastrado! ", res);
        this.msg.presentAlert("OK, ok!", "Cadastrado com sucesso!");
        this.usuario = new Usuario;
        form.reset();
        this.router.navigate(['']);
      },
      erro => {
        console.log("Erro: ", erro);
        this.msg.presentAlert("Ops!", "Erro ao tentar cadastrar!\nVerique os dados ou se o e-mail já foi cadastrado!" );
      }
    )
  }


  tirarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
}