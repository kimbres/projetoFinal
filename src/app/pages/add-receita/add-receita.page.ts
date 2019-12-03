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

}
