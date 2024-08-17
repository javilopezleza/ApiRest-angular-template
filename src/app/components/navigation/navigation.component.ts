import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnChanges {
  @Input() pokemonDetails: any;
  @Output() loadPokemon = new EventEmitter<number>();
  previousPokemonId: number | null = null;
  nextPokemonId: number | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonDetails'] && this.pokemonDetails) {
      this.setNavigationLinks();
    }
  }

  setNavigationLinks() {
    if (this.pokemonDetails) {
      const currentId = this.pokemonDetails.id;
      this.previousPokemonId = currentId > 1 ? currentId - 1 : null;
      this.nextPokemonId = currentId < 1025 ? currentId + 1 : null; 
    }
  }

  loadPreviousPokemon() {
    if (this.previousPokemonId) {
      this.loadPokemon.emit(this.previousPokemonId);
    }
  }

  loadNextPokemon() {
    if (this.nextPokemonId) {
      this.loadPokemon.emit(this.nextPokemonId);
    }
  }



}
