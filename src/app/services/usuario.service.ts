import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firedb: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  add(usuario:Usuario) {
    return this.afAuth.auth.createUserWithEmailAndPassword(usuario.email,usuario.pws).then(
      res=>{
        usuario.pws= null;
        usuario.email = null;
        return this.firedb.object("usuarios/"+res.user.uid).set(usuario).then().catch(
          ()=>{
            this.afAuth.auth.currentUser.delete();
          });
        // (usuario) ({
        //   nome: usuario.nome,
        //   ativo: usuario.ativo,
        // })
      },
      erro=>{
        this.afAuth.auth.currentUser.delete(); // para deleter autenticação em caso de erro. 
      }
    )
   // return this.firedb.object("usuarios").set(usuario);
   // return this.firedb.list("usuarios").push(usuario);
    }

  get(){
    let user = this.afAuth.auth.currentUser;
    console.log(user);
    return this.firedb.object("usuarios/"+user.uid).valueChanges();
  }

  update(usuario:Usuario){
    let user = this.afAuth.auth.currentUser;
    return this.firedb.object("usuarios/"+user.uid).update(usuario);
  }

  delete(usuario:Usuario){
    let uid = this.afAuth.auth.currentUser.uid;
    this.afAuth.auth.currentUser.delete();
    return this.firedb.object("usuarios/" + uid).update({ativo:false});
  }
}

