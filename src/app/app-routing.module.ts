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
  { path: 'endereco', loadChildren: './model/endereco/endereco.module#EnderecoPageModule' },
  { path: 'add-usuario', loadChildren: './pages/add-usuario/add-usuario.module#AddUsuarioPageModule' },
  { path: 'add-receita', loadChildren: './pages/add-receita/add-receita.module#AddReceitaPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'teste', loadChildren: './teste/teste.module#TestePageModule' },
  { path: 'mapeamento', loadChildren: './pages/mapeamento/mapeamento.module#MapeamentoPageModule' },
  { path: 'subs-alimentos', loadChildren: './subs-alimentos/subs-alimentos.module#SubsAlimentosPageModule' },
  { path: 'restaurantes', loadChildren: './pages/restaurantes/restaurantes.module#RestaurantesPageModule' },
  { path: 'list-receita', loadChildren: './pages/list-receita/list-receita.module#ListReceitaPageModule' },
  { path: 'list-restaurante', loadChildren: './pages/list-restaurante/list-restaurante.module#ListRestaurantePageModule' },
  { path: 'perfil-usuario', loadChildren: './pages/perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },
  { path: 'perfil-restaurante/:id', loadChildren: './pages/perfil-restaurante/perfil-restaurante.module#PerfilRestaurantePageModule' },
  { path: 'perfil-receita/:id', loadChildren: './pages/perfil-receita/perfil-receita.module#PerfilReceitaPageModule' }

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
