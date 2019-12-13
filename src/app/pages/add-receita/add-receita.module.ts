import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { TagInputModule } from 'ngx-chips';

import { IonicModule } from '@ionic/angular';

import { AddReceitaPage } from './add-receita.page';

const routes: Routes = [
  {
    path: '',
    component: AddReceitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TagInputModule
  ],
  declarations: [AddReceitaPage]
})
export class AddReceitaPageModule {}
