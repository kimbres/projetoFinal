import { Router } from '@angular/router';
import { Usuario } from './../../model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit, Sanitizer } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  protected usuario:Usuario

  constructor(
    protected UsuarioService:UsuarioService,
    private router:Router

  ) { }

  ngOnInit() {
     if (!this.UsuarioService.afAuth.auth.currentUser){
       this.UsuarioService.get().subscribe(
         res=>{
           this.usuario = res
         },
         erro=>{
           console.log(erro)
           this.router.navigate(['login'])
         }
       )
     }

  }


  sair(){
    this.UsuarioService.logout();
    this.router.navigate([""])
       
  }


}
