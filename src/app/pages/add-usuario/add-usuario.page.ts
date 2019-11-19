import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Router } from '@angular/router';

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
    private router:Router

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

}
