import { Component, OnInit } from '@angular/core';
import { Comic } from '../../interfaces/comic.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelService } from '../../services/peticiones.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil-comic',
  templateUrl: './perfil-comic.component.html',
  styleUrls: ['./perfil-comic.component.css'],
})
export class PerfilComicComponent implements OnInit {
  rutaImagen: string = '';
  escritores: string[] = [];
  dibujantes: string[] = [];
  idHeroe: number = 0;
  resultadoComic: Comic | null = null;

  constructor(
    private location: Location,
    private comicActivo: ActivatedRoute,
    private marvelService: MarvelService,
    private navegar: Router
  ) {}

  /**
   * Esta es una función de Angular que se ejecuta al inicializar el componente.
   * En este caso, suscribimos el componente a los cambios de la URL para obtener el ID del cómic que se está visualizando y cargar la información
   * del mismo a través del servicio marvelService.
   */
  ngOnInit(): void {
    this.comicActivo.params.subscribe((param) => {
      this.marvelService.getComic(param['id']).subscribe((resp) => {
        this.rutaImagen = this.buscarImagen(resp);
        this.escritores = this.buscarEscritores(resp);
        this.dibujantes = this.buscarDibujantes(resp);
        this.resultadoComic = resp;
      });
    });
  }

  /**
   * Esta función recibe como parámetro la respuesta del servicio getComic() que se ejecuta en ngOnInit().
   * Esta función busca la imagen asociada al cómic y devuelve la ruta completa de la imagen.
   * @param resp
   * @returns
   */
  buscarImagen(resp: Comic) {
    return (
      'https://i.annihil.us/u/prod/marvel/i/mg' +
      resp.data.results[0].thumbnail.path.split('mg')[1] +
      '.' +
      resp.data.results[0].thumbnail.extension
    );
  }

  /**
   * Esta función recibe la misma respuesta que la función anterior y busca los escritores asociados al cómic.
   * Devuelve un array con los nombres de los escritores.
   * @param resp
   * @returns
   */
  buscarEscritores(resp: Comic) {
    return resp.data.results[0].creators.items
      .filter((item) => item.role === 'writer')
      .map((escritores) => escritores.name);
  }

  /**
   * Esta función recibe la misma respuesta que las anteriores y busca los dibujantes asociados al cómic.
   * Devuelve un array con los nombres de los dibujantes.
   * @param resp
   * @returns
   */
  buscarDibujantes(resp: Comic) {
    return resp.data.results[0].creators.items
      .filter((item) => item.role === 'penciller')
      .map((dibujantes) => dibujantes.name);
  }

  /**
   * Esta función recibe el nombre de un héroe relacionado con el cómic que se está visualizando y lo utiliza para buscar el ID del héroe en la API
   * de Marvel a través del servicio marvelService.
   * Una vez obtenido el ID, utiliza el servicio navegar de Angular para navegar a la página de perfil del héroe.
   * @param name
   */
  redirectHeroe(name: string) {
    this.marvelService.searchHeroebyName(name).subscribe((resp) => {
      this.idHeroe = resp.data.results[0].id;
      this.navegar.navigate(['heroe', this.idHeroe]);
    });
  }

  /**
   * Esta función utiliza el servicio location de Angular para volver a la página anterior en el historial del navegador.
   */
  goBack() {
    this.location.back();
  }
}
