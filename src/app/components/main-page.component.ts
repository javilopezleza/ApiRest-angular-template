import { Component } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PokeInfoComponent } from './poke-info/poke-info.component';
import { PokeApiService } from '../services/poke-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mainPage',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent, 
    PokeInfoComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  pokemonDetails: any;
  loading: boolean = false;

  constructor(private pokeApi: PokeApiService) { }

  onSearch(pokemonId: number) {
    this.loading = true;
    this.pokeApi.getPokemonDetails(pokemonId).subscribe(data => {
      this.pokemonDetails = data;
      this.loading = false;
    }, error => {
      console.error('Error fetching Pokémon details', error);
      this.pokemonDetails = null;
      this.loading = false;
    });
  }
}
