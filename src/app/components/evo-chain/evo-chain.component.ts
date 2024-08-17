import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'evoChain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evo-chain.component.html',
  styleUrl: './evo-chain.component.css'
})
export class EvoChainComponent implements OnChanges{

  @Input() speciesUrl: string = '';
  @Output() pokemonSelected: EventEmitter<number> = new EventEmitter<number>();

  evolutionChain: any[] = [];

  constructor(private pokeApi: PokeApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['speciesUrl'] && this.speciesUrl) {
      this.fetchEvolutionChain();
    }
  }

  fetchEvolutionChain() {
    this.pokeApi.getSpeciesDetails(this.speciesUrl).subscribe(speciesData => {
      this.pokeApi.getEvolutionChain(speciesData.evolution_chain.url).subscribe(evolutionData => {
        this.parseEvolutionChain(evolutionData.chain);
      });
    });
  }

  parseEvolutionChain(chain: any) {
    let evolutionNode = chain;
    this.evolutionChain = [];
    while (evolutionNode) {
      this.evolutionChain.push({
        name: evolutionNode.species.name,
        id: evolutionNode.species.url.split('/').filter(Boolean).pop()
      });
      evolutionNode = evolutionNode.evolves_to[0];
    }
  }

  onPokemonClick(id: number) {
    this.pokemonSelected.emit(id);
  }

}
