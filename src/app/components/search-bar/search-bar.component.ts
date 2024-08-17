import { Component, EventEmitter, Output } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'searchBar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  pokemonId: number | null = null;
  @Output() search = new EventEmitter<number>();

  searchPokemon() {
    if(this.pokemonId !==null) {
      this.search.emit(this.pokemonId);
    }
  }


}
