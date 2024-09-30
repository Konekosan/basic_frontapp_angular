import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poo.component.html',
  styleUrl: './poo.component.css'
})
export class PooComponent {
  
  rubriques = [
    'Classes/Objets',
    'Encapsulation',
    'Héritage',
    'Polymorphisme',
    'Abstraction'
  ];

  constructor(){
    // const chiffre: number = 1;
    // const animal: Animaux = new Animaux('girafe', 'grand', 'F');
  
  }


}

class Animaux {
  nom: string;
  race: string;
  sexe: string;
  private couleur: string = 'rouge';

  constructor(parametre_nom: string, race: string, sexe: string){
    this.nom = parametre_nom;
    this.race = race;
    this.sexe = sexe;
    console.log(this.couleur);
    console.log(this.race);
  }

  faitBruit() {
    console.log(`${this.nom} makes a sound.`);
  }

}

class Chat extends Animaux{
  constructor(public parametre_nom: string, race: string, sexe: string) {
    super(parametre_nom, race, sexe); // Appel au constructeur de la classe parente
  }

  miaule() {
    console.log(`${this.parametre_nom} barks.`);
  }

}
