import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubsAlimentosPage } from './subs-alimentos.page';

const routes: Routes = [
  {
    path: '',
    component: SubsAlimentosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubsAlimentosPage]
})
export class SubsAlimentosPageModule {}
