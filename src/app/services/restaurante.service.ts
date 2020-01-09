import { Restaurante } from 'src/app/model/restaurante';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(
    private fire: AngularFirestore,
    private firedb: AngularFireDatabase
  ) { }

  // add(restaurante: Restaurante) {
  //   return this.firedb.collection<Restaurante>("restaurante").add(
  //     {
  //       nome: restaurante.nome,
  //       descricao: restaurante.descricao,
  //       categoria: restaurante.categoria,
  //       bairro: restaurante.bairro,
  //       cep: restaurante.cep,
  //       telefone: restaurante.telefone,
  //       endereco: restaurante.endereco,
  //       site: restaurante.site,
  //       facebook: restaurante.facebook,
  //       fotos: restaurante.fotos,
  //       ativo: restaurante.ativo,
  //       lat: restaurante.lat,
  //       lng: restaurante.lng
  //     });
  // }

  // get(id) {
  //   return this.firedb.collection("restaurantes").doc<Restaurante>(id).valueChanges();
  // }

  // gelAll() {
  //   return this.firedb.collection<Restaurante>("restaurante", ref => ref.where('ativo', '==', true)).snapshotChanges()
  //     .pipe(
  //       map(dados =>
  //         dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
  //         //dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
  //       )
  //     )
  // }

  // update(restaurante: Restaurante, id: any) {
  //   return this.firedb.collection("restaurante").doc<Restaurante>(id).update(restaurante);
  // }

  // delete(id: any) {
  //   return this.firedb.collection("restaurante").doc<Restaurante>(id).update({
  //     ativo: false
  //   });
  //   //return this.firedb.collection("restaurantes").doc(id).remove();
  // }

  add(restaurante: Restaurante) {
    return this.firedb.list("restaurantes").push(restaurante)
  }

  getAll() {
    return this.firedb.list<Restaurante>("restaurantes").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      )
  }
  busca(dados) {
    return this.firedb.list<Restaurante>("restaurantes", ref => ref.orderByChild('nome').equalTo("%$"+dados+"%")).snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      )
  }


  get(id) {
    return this.firedb.object<Restaurante>("restaurantes/" + id).valueChanges();
  }

  update(restaurante: Restaurante, id) {
    return this.firedb.object("restaurantes/" + id).update(restaurante);
  }

  delete(id) {
    return this.firedb.object("restaurantes/" + id).remove()
  }
}