import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MarvelService } from '../../services/peticiones.service';
import { Result } from '../../interfaces/heroe.interface';
import { Series } from '../../interfaces/series.interface';

@Component({
  selector: 'app-perfil-heroe',
  templateUrl: './perfil-heroe.component.html',
  styleUrls: ['./perfil-heroe.component.css'],
})
export class PerfilHeroeComponent implements OnInit {
  rutaImagen: string = '';
  enlace: string = '';
  idHeroe: string = '';
  limit: string = '';
  offset: string = '';
  resultadoHeroe: Result | null = null;
  resultadoSerie!: Series;
  public api: string =
    '?ts=1000&hash=cf95359ee38358dab71af57b9e715e85&apikey=510c5c7672e863155540c01e26a71ebb';

  constructor(
    private location: Location,
    private perfilActivo: ActivatedRoute,
    private marvelService: MarvelService,
    private navegar: Router
  ) {}

  /**
   * ngOnInit() - esta es una función que se ejecuta cuando se inicializa el componente.
   * Utiliza el objeto perfilActivo de ActivatedRoute para obtener los parámetros de la ruta de la URL, y luego llama a getHeroe() del servicio
   * MarvelService para obtener la información del héroe correspondiente a esos parámetros.
   * La información del héroe se almacena en la variable resultadoHeroe y la ruta de la imagen se almacena en la variable rutaImagen.
   */
  ngOnInit(): void {
    this.limit = '10';
    this.offset = '0';
    this.perfilActivo.params.subscribe((p) => {
      this.idHeroe = p['id'];
      this.cargarSeries(this.idHeroe, this.limit, this.offset);
      this.marvelService.getHeroe(this.idHeroe).subscribe((resp) => {
        this.rutaImagen =
          'https://i.annihil.us/u/prod/marvel/i/mg' +
          resp.data.results[0].thumbnail.path.split('mg')[1] +
          '.' +
          resp.data.results[0].thumbnail.extension;

        this.resultadoHeroe = resp.data.results[0];
      });
    });
  }

  /**
   * Este método se activa cuando se produce un evento ionInfinite.
   * Dentro de este método, se utiliza setTimeout para agregar un retardo de 500 milisegundos.
   * Luego, se completa el evento ev para indicar que la carga ha finalizado utilizando target.complete().
   * Después, se llama al método incrementarLimite() para aumentar el límite y, finalmente, se llama al método cargarSeries() para cargar las
   * series utilizando los parámetros idHeroe, limit y offset.
   * @param ev
   */
  onIonInfinite(ev: Event) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete(),
        this.incrementarLimite(),
        this.cargarSeries(this.idHeroe, this.limit, this.offset);
    }, 500);
  }

  /**
   * Este método utiliza un servicio llamado marvelService para obtener las series de un héroe específico.
   * Recibe los parámetros idHeroe, limit y offset, y luego llama al método getSeriesHeroe() del servicio marvelService.
   * Cuando la respuesta es recibida a través de la suscripción, se asigna a this.resultadoSerie.
   * @param idHeroe
   * @param limit
   * @param offset
   */

  cargarSeries(idHeroe: string, limit: string, offset: string) {
    this.marvelService
      .getSeriesHeroe(idHeroe, limit, offset)
      .subscribe((resp) => {
        this.resultadoSerie = resp;
      });
  }

  /**
   * Este método se encarga de incrementar el valor del límite. Comienza comprobando si el límite actual es igual a 100.
   * En caso afirmativo, el método retorna sin hacer ningún cambio.
   * Si el límite actual no es igual a 100, se incrementa el valor del límite en 10 y se actualiza this.limit con el nuevo valor convertido a una
   * cadena de texto.
   * @returns
   */
  incrementarLimite(): void {
    let numero: number;
    if (Number(this.limit) == 100) {
      return;
    }
    numero = Number(this.limit) + 10;
    this.limit = numero.toString();
  }

  /**
   * "redirectSerie": esta función se utiliza para navegar al componente de la serie cuando se hace clic en el enlace de la serie.
   * Primero, se construye el enlace completo a la serie utilizando la propiedad "enlace" y el objeto "api".
   * Luego, se llama al método "getSeries" del servicio "MarvelService" para recuperar la serie completa de la API de Marvel.
   * Finalmente, se utiliza la función "navigate" del objeto "Router" para navegar al componente de la serie y mostrar la información de la serie.
   * @param enlace
   */
  redirectSerie(enlace: string) {
    const urlArray = enlace.split('/');
    const serieId: string = urlArray[urlArray.length - 1];
    this.marvelService.getSeriesbyId(Number(serieId)).subscribe((resp) => {
      this.navegar.navigate(['series', resp.data.results[0].id]);
    });
  }

  /**
   * Esta función se utiliza para volver a la página anterior en el historial del navegador utilizando el objeto "Location".
   */
  goBack() {
    this.location.back();
  }
}
