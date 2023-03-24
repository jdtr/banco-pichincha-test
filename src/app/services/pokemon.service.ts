import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IupdatePokemon, Ipokemon } from '../helpers/pokemon.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _urlBase = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon"

  constructor(private _http: HttpClient) { }

  getPokemon(idAuthor: string): Observable<Ipokemon[]> {
    return this._http.get<Ipokemon[]>(`${this._urlBase}/?idAuthor=${idAuthor}`);
  }
  getPokemonById(id: string) {
    return this._http.get(`${this._urlBase}/${id}`);
  }
  postPokemon(data: IupdatePokemon) {
    return this._http.post(`${this._urlBase}/`, data);
  }
  putPokemon(id: number, data: IupdatePokemon) {
    return this._http.put(`${this._urlBase}/${id}`, data)
  }
  deletePokemon(id: number) {
    return this._http.delete(`${this._urlBase}/${id}`)
  }
}
