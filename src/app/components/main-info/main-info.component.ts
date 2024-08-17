import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mainInfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.css']
})
export class MainInfoComponent {
  @Input() pokemonDetails: any;

  get heightInMeters(): number {
    return this.pokemonDetails ? this.pokemonDetails.height / 10 : 0;
  }

  get weightInKilograms(): number {
    return this.pokemonDetails ? this.pokemonDetails.weight / 10 : 0;
  }
}
