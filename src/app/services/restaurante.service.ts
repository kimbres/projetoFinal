import { Restaurante } from './../model/restaurante';
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(
    private firedb: AngularFirestore
  ) { }

  add(restaurante: Restaurante) {
    return this.firedb.collection<Restaurante>("restaurante").add(
      {
        nome: restaurante.nome,
        descricao: restaurante.descricao,
        categoria: restaurante.categoria,
        fotos: restaurante.fotos,
        ativo: restaurante.ativo,
        lat: restaurante.lat,
        lng: restaurante.lng
      });
  }

  get(id) {
    return this.firedb.collection("restaurantes").doc<Restaurante>(id).valueChanges();
  }

  gelAll() {
    return this.firedb.collection<Restaurante>("restaurante", ref => ref.where('ativo', '==', true)).snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
          //dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      )
  }

  update(restaurante: Restaurante, id: any) {
    return this.firedb.collection("restaurante").doc<Restaurante>(id).update(restaurante);
  }

  delete(id: any) {
    return this.firedb.collection("restaurante").doc<Restaurante>(id).update({
      ativo: false
    });
    //return this.firedb.collection("restaurantes").doc(id).remove();
  }

}