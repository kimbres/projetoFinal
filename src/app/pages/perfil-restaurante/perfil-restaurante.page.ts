import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/model/restaurante';
import { ActivatedRoute } from '@angular/router'
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-perfil-restaurante',
  templateUrl: './perfil-restaurante.page.html',
  styleUrls: ['./perfil-restaurante.page.scss'],
})
export class PerfilRestaurantePage implements OnInit {

  private restaurante: Restaurante = new Restaurante
  private id: string;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 4,
    speed: 400
  }

  constructor(
    private restauranteService: RestauranteService,
    private ativeRouter: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.id = this.ativeRouter.snapshot.paramMap.get("id")
    this.restauranteService.get(this.id).subscribe(
      res => {
        this.restaurante = res
      }
    )
  }

}