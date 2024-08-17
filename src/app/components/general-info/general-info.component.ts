import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'generalInfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.css'
})
export class GeneralInfoComponent implements OnChanges{

  @Input() pokemonDetails: any;
  generations: string[] = [];
  types: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonDetails'] && this.pokemonDetails) {
      this.extractGenerations();
      this.extractTypes();
    }
  }

  
  extractGenerations() {
    if (this.pokemonDetails && this.pokemonDetails.game_indices) {
      const uniqueGenerations: Set<string> = new Set();
      this.pokemonDetails.game_indices.forEach((game: any) => {
        const version = game.version.name;
        uniqueGenerations.add(this.mapVersionToGeneration(version));
      });
      this.generations = Array.from(uniqueGenerations);
    }
  }

  mapVersionToGeneration(version: string): string {
    const generationMap: { [key: string]: string } = {
      'red': 'Generación I',
      'blue': 'Generación I',
      'yellow': 'Generación I',
      'green': 'Generación I',
      'gold': 'Generación II',
      'silver': 'Generación II',
      'crystal': 'Generación II',
      'ruby': 'Generación III',
      'sapphire': 'Generación III',
      'emerald': 'Generación III',
      'firered': 'Generación III',
      'leafgreen': 'Generación III',
      'diamond': 'Generación IV',
      'pearl': 'Generación IV',
      'platinum': 'Generación IV',
      'heartgold': 'Generación IV',
      'soulsilver': 'Generación IV',
      'black': 'Generación V',
      'white': 'Generación V',
      'black-2': 'Generación V',
      'white-2': 'Generación V',
      'x': 'Generación VI',
      'y': 'Generación VI',
      'omega-ruby': 'Generación VI',
      'alpha-sapphire': 'Generación VI',
      'sun': 'Generación VII',
      'moon': 'Generación VII',
      'ultra-sun': 'Generación VII',
      'ultra-moon': 'Generación VII',
      'lets-go-pikachu': 'Generación VII',
      'lets-go-eevee': 'Generación VII',
      'sword': 'Generación VIII',
      'shield': 'Generación VIII',
      'brilliant-diamond': 'Generación VIII',
      'shining-pearl': 'Generación VIII',
      'legends-arceus': 'Generación VIII',
      'scarlet': 'Generación IX',
      'violet': 'Generación IX',
    };
    return generationMap[version] || 'Generación desconocida';
  }
  
  extractTypes() {
    if (this.pokemonDetails && this.pokemonDetails.types) {
      this.types = this.pokemonDetails.types.map((typeInfo: any) => typeInfo.type.name);
    }
  }

}
