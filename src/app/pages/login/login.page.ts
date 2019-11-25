import { Router } from '@angular/router';
import { MensagemService } from './../../services/mensagem.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email:string = null;
  protected pws:string = null;

  
  constructor(
    private afAuth: AngularFireAuth,
    private router:Router,
    private msg:MensagemService
  ) { }

  ngOnInit() {
  }



onSubmit(fc){

}

login(){
  this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(res=>{
    this.router.navigate([''])
  }),
  err=>{
    this.msg.presentAlert("Ops!", "Não foi encontrado o usuario!")
  }
}

logout(){
  this.afAuth.auth.signOut();
}


}
