import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'perfil-usuario', loadChildren: './pages/perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },
  { path: 'endereco', loadChildren: './model/endereco/endereco.module#EnderecoPageModule' },
  { path: 'add-usuario', loadChildren: './pages/add-usuario/add-usuario.module#AddUsuarioPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'add-receita', loadChildren: './pages/add-receita/add-receita.module#AddReceitaPageModule' },
  { path: 'list-receita', loadChildren: './pages/list-receita/list-receita.module#ListReceitaPageModule' },
  { path: 'teste', loadChildren: './teste/teste.module#TestePageModule' },
  { path: 'mapeamento', loadChildren: './pages/mapeamento/mapeamento.module#MapeamentoPageModule' },
  { path: 'subs-alimentos', loadChildren: './subs-alimentos/subs-alimentos.module#SubsAlimentosPageModule' },
  { path: 'restaurantes', loadChildren: './pages/restaurantes/restaurantes.module#RestaurantesPageModule' },
  { path: 'add-restaurante', loadChildren: './pages/add-restaurante/add-restaurante.module#AddRestaurantePageModule' },
  { path: 'list-restaurante', loadChildren: './pages/list-restaurante/list-restaurante.module#ListRestaurantePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
