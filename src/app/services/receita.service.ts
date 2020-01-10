import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Receita } from '../model/receita';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  constructor(
    private firedb: AngularFireDatabase,
    private fire: AngularFirestore
  ) { }

  add(receita: Receita) {
    return this.firedb.list("receitas").push(receita)
  }

  get(id) {
    return this.firedb.object<Receita>("receitas/" + id).valueChanges();
  }

  getAll() {
    return this.firedb.list<Receita>("receitas").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      )
  }
  busca(dados) {
    return this.firedb.list<Receita>("receitas", ref => ref.orderByChild('nome').equalTo("%$"+dados+"%")).snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      )
  }

  update(receita: Receita, id) {
    return this.firedb.object("receitas/" + id).update(receita);
  }

  delete(id) {
    return this.firedb.object("receitas/" + id).remove()
  }


}
