import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Receita } from '../model/receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  constructor(
    private firedb: AngularFireDatabase,
  ) { }

  add(receita: Receita) {
    return this.firedb.list("receitas").push(receita)
  }

  get(id) {
    return this.firedb.object("receitas/" + id).valueChanges();
  }

  update(receita: Receita, id) {
    return this.firedb.object("receitas/" + id).update(receita);
  }

  delete(id) {
    return this.firedb.object("receitas/" + id).remove()
  }


}
