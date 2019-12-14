import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddRestaurantePage } from './add-restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: AddRestaurantePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddRestaurantePage]
})
export class AddRestaurantePageModule {}
