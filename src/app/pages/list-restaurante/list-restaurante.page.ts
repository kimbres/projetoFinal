import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Restaurante } from 'src/app/model/restaurante';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-list-restaurante',
  templateUrl: './list-restaurante.page.html',
  styleUrls: ['./list-restaurante.page.scss'],
})
export class ListRestaurantePage implements OnInit {

  protected restaurantes: Restaurante[];
  protected lista: boolean = false

  constructor(
    private restauranteService: RestauranteService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.restauranteService.getAll().subscribe(
      res => {
        this.restaurantes = res;
        console.log(res);
      }
    )
  }

  async remover(id) {
    const alert = await this.msg.alertController.create({
      header: 'Confirmar!',
      message: 'Deseja apagar o produto?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.msg.presentLoading()
            this.restauranteService.delete(id).then(
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
}