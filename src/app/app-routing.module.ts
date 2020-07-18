import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/search/repos', pathMatch: 'full'},
  { path: 'search/repos', loadChildren: () => import('./repos-search/repos-search.module').then(m => m.ReposSearchModule) },
  { path: '**', redirectTo: '/search/repos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
