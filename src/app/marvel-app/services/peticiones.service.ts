import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { Observable } from 'rxjs';
import { Comics } from '../interfaces/comics.interface';
import { Comic } from '../interfaces/comic.interface';
import { Series } from '../interfaces/series.interface';

@Injectable({ providedIn: 'root' })
export class MarvelService {
  private baseUrlHeroe: string =
    'https://gateway.marvel.com:443/v1/public/characters';
  private baseUrlComic: string =
    'https://gateway.marvel.com:443/v1/public/comics';
  private apiKey =
    '510c5c7672e863155540c01e26a71ebb&hash=cf95359ee38358dab71af57b9e715e85';

  private page: number = 0;
  constructor(private httpClient: HttpClient) {}

  /**HEROES**/

  getHeroes(numPage: number): Observable<Heroe> {
    return this.httpClient.get<Heroe>(
      `${this.baseUrlHeroe}?ts=1000&apikey=${this.apiKey}&limit=28&offset=${numPage}`
    );
  }

  getHeroe(idHeroe: string): Observable<Heroe> {
    return this.httpClient.get<Heroe>(
      `${this.baseUrlHeroe}/${idHeroe}?ts=1000&apikey=${this.apiKey}`
    );
  }

  searchHeroe(param: string) {
    return this.httpClient.get<Heroe>(
      `${this.baseUrlHeroe}?ts=1000&apikey=${this.apiKey}&nameStartsWith=${param}&limit=10`
    );
  }

  searchHeroebyName(name: string): Observable<Heroe> {
    return this.httpClient.get<Heroe>(
      `${this.baseUrlHeroe}?name=${name}&ts=1000&apikey=${this.apiKey}`
    );
  }

  /**COMICS**/

  getComics(numPage: number): Observable<Comics> {
    return this.httpClient.get<Comics>(
      `${this.baseUrlComic}?format=comic&ts=1000&apikey=${this.apiKey}&limit=28&offset=${numPage}&orderBy=focDate`
    );
  }
  getComic(idComic: string): Observable<Comic> {
    return this.httpClient.get<Comic>(
      `${this.baseUrlComic}/${idComic}?&ts=1000&apikey=${this.apiKey}`
    );
  }

  /**SERIES**/

  getSeriesHeroe(
    idHeroe: string,
    limit: string,
    offset: string
  ): Observable<Series> {
    return this.httpClient.get<Series>(
      `${this.baseUrlHeroe}/${idHeroe}/series?ts=1000&apikey=${this.apiKey}&limit=${limit}&offset=${offset}`
    );
  }

  getSeries(urlSeries: string) {
    return this.httpClient.get<Series>(`${urlSeries}`);
  }

  getSeriesbyId(id: number) {
    return this.httpClient.get<Series>(
      `https://gateway.marvel.com:443/v1/public/series/${id}?ts=1000&apikey=${this.apiKey}`
    );
  }
}
