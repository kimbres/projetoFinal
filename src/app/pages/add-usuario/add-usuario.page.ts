import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  protected  usuario: Usuario = new Usuario;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.usuario);
    
  }

}
