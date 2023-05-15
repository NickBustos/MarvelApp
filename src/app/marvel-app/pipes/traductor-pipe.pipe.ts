import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traductorPipe',
})
export class TraductorPipePipe implements PipeTransform {
  transform(param: string): string {
    if (param === 'writer') {
      return 'Escritor';
    } else if (param === 'penciller (cover)') {
      return 'Dibujante (Caratula)';
    } else if (param === 'penciller') {
      return 'Dibujante';
    } else if (param === 'editor') {
      return 'Editor';
    } else if (param === 'artist') {
      return 'Artista';
    } else if (param === 'colorist') {
      return 'Coloreador';
    } else if (param === 'inker') {
      return 'Entintador ';
    } else if (param === 'letterer') {
      return 'Rotulista';
    } else if (param === 'penciler') {
      return 'Dibujante';
    }

    return '';
  }
}
