import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarvelAppRoutingModule } from './marvel-app-routing.module';
import { IonicModule } from '@ionic/angular';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { LogoComponent } from './shared/logo/logo.component';
import { RouterModule } from '@angular/router';
import { ComicsComponent } from './pages/comics/comics.component';
import { TraductorPipePipe } from './pipes/traductor-pipe.pipe';

@NgModule({
  declarations: [SidenavComponent, LogoComponent, TraductorPipePipe],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot(),
    MarvelAppRoutingModule,
  ],
  exports: [SidenavComponent, LogoComponent, IonicModule, TraductorPipePipe],
})
export class MarvelAppModule {}
