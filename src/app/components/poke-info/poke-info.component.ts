import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokeApiService } from '../../services/poke-api.service';
import { GeneralInfoComponent } from "../general-info/general-info.component";
import { EvoChainComponent } from "../evo-chain/evo-chain.component";
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: 'pokeInfo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GeneralInfoComponent,
    EvoChainComponent,
    NavigationComponent
  ],
  templateUrl: './poke-info.component.html',
  styleUrls: ['./poke-info.component.css']
})
export class PokeInfoComponent implements OnChanges {
  @Input() pokemonDetails: any;
  previousPokemonId: number | null = null;
  nextPokemonId: number | null = null;
  notFound: boolean = false;
  initialMessage: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonDetails']) {
      if (this.pokemonDetails) {
        this.notFound = false;
        this.initialMessage = false;
      } else {
        this.notFound = this.pokemonDetails === null;
        this.initialMessage = false;
      }
    }
  }

  constructor(private pokeApi: PokeApiService) { }

  get heightInMeters(): number {
    return this.pokemonDetails ? this.pokemonDetails.height / 10 : 0;
  }

  get weightInKilograms(): number {
    return this.pokemonDetails ? this.pokemonDetails.weight / 10 : 0;
  }


  onPokemonSelected(id: number) {
    this.fetchPokemonDetails(id);
  }

  fetchPokemonDetails(id: number) {
    this.notFound = false;
    this.initialMessage = false;
    this.pokeApi.getPokemonDetails(id).subscribe(
      data => {
        this.pokemonDetails = data;
      },
      error => {
        this.pokemonDetails = null; 
        this.notFound = true; 
      }
    );
  }
}
