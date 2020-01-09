import { Component, OnInit } from '@angular/core';
import { Receita } from 'src/app/model/receita';
import { ActivatedRoute } from '@angular/router'
import { ReceitaService } from 'src/app/services/receita.service';

@Component({
  selector: 'app-perfil-receita',
  templateUrl: './perfil-receita.page.html',
  styleUrls: ['./perfil-receita.page.scss'],
})
export class PerfilReceitaPage implements OnInit {

  private receita: Receita = new Receita
  private id: string;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 4,
    speed: 400
  }

  constructor(
    private receitaService: ReceitaService,
    private ativeRouter: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.id = this.ativeRouter.snapshot.paramMap.get("id")
    this.receitaService.get(this.id).subscribe(
      res => {
        this.receita = res
      }
    )
  }

}