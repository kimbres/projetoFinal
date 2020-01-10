import { Component, OnInit } from '@angular/core';
import { ReceitaService } from 'src/app/services/receita.service';
import { Receita } from 'src/app/model/receita';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-list-receita',
  templateUrl: './list-receita.page.html',
  styleUrls: ['./list-receita.page.scss'],
})
export class ListReceitaPage implements OnInit {

  protected receitas: Receita[];
  protected lista: boolean = false
  texto: string= ""
  constructor(
    private receitaService: ReceitaService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.receitaService.getAll().subscribe(
      res => {
        this.receitas = res;
        console.log(res);
      }
    )
  }

  async remover(id) {
    const alert = await this.msg.alertController.create({
      header: 'Confirmar!',
      message: 'Deseja apagar a receita?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.msg.presentLoading()
            this.receitaService.delete(id).then(
              _ => this.msg.dismissLoading()
            )
          }
        },
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    })
    await alert.present()
  }

  busca(){
    this.receitaService.busca(this.texto).subscribe(
      res => {
        this.receitas = res;
        console.log(res);
      }
    )
  }
}