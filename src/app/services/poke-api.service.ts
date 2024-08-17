import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  //Get pokemon details
  getPokemonDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${id}`)
  }

  //Get specie details
  getSpeciesDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  //Get evolution chain
  getEvolutionChain(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


}
