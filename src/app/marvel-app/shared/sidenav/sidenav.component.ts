import { Component } from '@angular/core';

import { MarvelService } from '../../services/peticiones.service';
import { Result } from '../../interfaces/heroe.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css', '../estilos.scss'],
})
export class SidenavComponent {
  events: string[] = [];
  opened: boolean = true;
  public selectedHero!: Result;
  public prueba: any;
  public resultados: Result[] = [];
  public searchInput: string = '';
  public codigoHeroe: number = 0;

  constructor(
    private navegador: Router,
    private marvelService: MarvelService
  ) {}
  /**
   * searchHeroe(): esta función se encarga de hacer una solicitud a la API de Marvel con el fin de buscar un héroe en particular.
   * Utiliza el valor de entrada searchInput que se introduce en un campo de entrada de texto.
   * Luego, actualiza el arreglo resultados con los resultados devueltos por la API.
   */
  searchHeroe(event: any) {
    const query = event.target.value.toLowerCase();
    if (query == '') {
      this.resultados = [];
      return;
    }
    this.searchInput = query;
    console.log(this.searchInput);
    this.marvelService.searchHeroe(query).subscribe((resp) => {
      this.resultados = resp.data.results;
    });
  }

  /**
   * onSelectedOption(): esta función se encarga de asignar el héroe seleccionado al campo selectedHero.
   * También establece el valor del campo codigoHeroe como el id del héroe seleccionado y establece el valor del campo searchInput como el nombre del
   * héroe seleccionado.
   * @param param
   * @returns
   */
  onSelectedOption(param: Result): void {
    console.log(param.id);
    this.navegador.navigate(['heroe', param.id]);
  }

  /**
   * vonSelectedOption(): esta función se encarga de asignar el héroe seleccionado al campo selectedHero.
   * También establece el valor del campo codigoHeroe como el id del héroe seleccionado y establece el valor del campo searchInput como el nombre del héroe seleccionado.
   */
  comprobarInput(): boolean {
    if (this.resultados.length == 0 || this.searchInput == '') {
      return false;
    } else {
      return true;
    }
  }

  sideNavItems = [
    {
      label: 'Heroes',
      icon: 'circle',
      url: 'heroes/1',
    },
    {
      label: 'Comics',
      icon: 'circle',
      url: 'comics/0',
    },
  ];
}
