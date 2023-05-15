import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PerfilComicComponent } from './perfil-comic/perfil-comic.component';
import { PerfilHeroeComponent } from './perfil-heroe/perfil-heroe.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ErrorComponent } from './error/error.component';
import { SeriesComponent } from './series/series.component';
import { MarvelAppModule } from '../marvel-app.module';
import { ComicsComponent } from './comics/comics.component';
import { TraductorPipePipe } from '../pipes/traductor-pipe.pipe';

@NgModule({
  declarations: [
    ComicsComponent,
    PerfilComicComponent,
    PerfilHeroeComponent,
    HeroesComponent,
    ErrorComponent,
    SeriesComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, MarvelAppModule],
})
export class PagesModule {}
