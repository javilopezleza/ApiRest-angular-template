import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokeApiService } from '../../services/poke-api.service';
import { GeneralInfoComponent } from "../general-info/general-info.component";
import { EvoChainComponent } from "../evo-chain/evo-chain.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { MainInfoComponent } from '../main-info/main-info.component';
import { finalize, tap, timer } from 'rxjs';

@Component({
  selector: 'pokeInfo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MainInfoComponent,
    GeneralInfoComponent,
    EvoChainComponent,
    NavigationComponent
  ],
  templateUrl: './poke-info.component.html',
  styleUrls: ['./poke-info.component.css']
})
export class PokeInfoComponent {
  @Input() pokemonDetails: any;
  @Input() pokemonId: number | null = null;

  notFound: boolean = false;
  initialMessage: boolean = true;
  loading:boolean = false;
  showSpinner: boolean = false;

  constructor(private pokeApi: PokeApiService) {}

  onPokemonSelected(id: number) {
    this.fetchPokemonDetails(id);
  }

  fetchPokemonDetails(id: number) {
    this.notFound = false;
    this.initialMessage = false;
    this.loading = true;
    this.showSpinner = true; // Muestra el spinner

    // Temporizador para ocultar el spinner después de un retraso mínimo
    const minSpinnerDelay = 2000; // 2 segundos
    const startTime = Date.now();

    this.pokeApi.getPokemonDetails(id).pipe(
      tap(() => {
        // Solo empieza el temporizador si el spinner es visible
        if (this.showSpinner) {
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < minSpinnerDelay) {
            timer(minSpinnerDelay - elapsedTime).subscribe(() => this.loading = false);
          } else {
            this.loading = false;
          }
        }
      }),
      finalize(() => {
        // Asegura que el spinner se oculta cuando la carga termina
        this.showSpinner = false;
        this.loading = false;
      })
    ).subscribe(
      data => {
        this.pokemonDetails = data;
        this.notFound = false;
      },
      error => {
        this.pokemonDetails = null;
        this.notFound = true;
      }
    );
  }
}
