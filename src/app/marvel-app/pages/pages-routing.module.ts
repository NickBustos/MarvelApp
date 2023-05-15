import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { PerfilHeroeComponent } from './perfil-heroe/perfil-heroe.component';
import { ComicsComponent } from './comics/comics.component';
import { PerfilComicComponent } from './perfil-comic/perfil-comic.component';
import { SeriesComponent } from './series/series.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'heroes/:page',
        component: HeroesComponent,
      },
      {
        path: 'heroe/:id',
        component: PerfilHeroeComponent,
      },
      {
        path: 'comics/:page',
        component: ComicsComponent,
      },
      {
        path: 'comic/:id',
        component: PerfilComicComponent,
      },
      {
        path: 'series/:id',
        component: SeriesComponent,
      },
      { path: 'error', component: ErrorComponent },
      {
        path: '',
        redirectTo: 'heroes/1',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
