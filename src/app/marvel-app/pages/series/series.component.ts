import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelService } from '../../services/peticiones.service';
import { Item } from '../../interfaces/series.interface';
import { Series } from '../../interfaces/comic.interface';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent {
  public comics: Item[] = [];
  public rutaImagen!: string;
  public rating!: string;
  public nombreSerie: string = '';

  constructor(
    private location: Location,
    private rutaActiva: ActivatedRoute,
    private marveService: MarvelService,
    private navegador: Router
  ) {}

  ngOnInit(): void {
    this.rutaActiva.params.subscribe((resp) => {
      /**getSeriesbyId del marveService para obtener los cómics de la serie.
       * Asigna el nombre de la serie a la variable nombreSerie y la lista de cómics a la variable comics. */
      this.marveService.getSeriesbyId(resp['id']).subscribe((resp) => {
        this.rating = resp.data.results[0].rating;
        this.rutaImagen =
          resp.data.results[0].thumbnail.path +
          '.' +
          resp.data.results[0].thumbnail.extension;
        this.nombreSerie = resp.data.results[0].title;
        this.comics = resp.data.results[0].comics.items;
      });
    });
  }

  /**
   * Esta función recibe un cómic como parámetro y extrae su id de la URL del recurso.
   * Navega a la página de perfil del cómic utilizando el router de Angular.
   * @param comic
   */
  navegarComic(comic: Item) {
    const urlArray = comic.resourceURI.split('/');
    const comicId: string = urlArray[urlArray.length - 1];
    this.navegador.navigate(['comic', comicId]);
  }

  goBack() {
    this.location.back();
  }
}
