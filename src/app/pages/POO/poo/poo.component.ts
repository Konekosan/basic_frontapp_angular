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
    // const car = new Car(1);
    // car.drive();

    // const child = new Child();
    // child.printChildProperties()
  }
}

  // encapsulation private public
  class Person {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public getName(): string {
        return this.name;
    }

    public setName(newName: string): void {
        this.name = newName;
    }
  }

  //interface
  interface Drivable {
    speed: number;
    drive(): void;
  }

  // Class implements interface
  class Car implements Drivable {
    speed: number;
    
    constructor(speed: number) {
        this.speed = speed;
    }

    drive(): void {
        console.log(`La voiture roule à ${this.speed} km/h.`);
    }
  }

  
  class Parent {
    public publicProperty = 'public';
    private privateProperty = 'private';
    protected protectedProperty = 'protected';
    
    public printProperties(): void {
        console.log(this.publicProperty, this.privateProperty, this.protectedProperty);
    }
  }

  class Child extends Parent {
    public printChildProperties(): void {
        console.log(this.publicProperty);
        //console.log(this.privateProperty);
        console.log(this.protectedProperty);
    }
  }