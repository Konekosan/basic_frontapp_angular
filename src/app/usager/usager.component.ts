import { Component, OnInit } from '@angular/core';
import { UsagerService } from './usager.service';
import { MaterialModule } from '../_module/Material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usager',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './usager.component.html',
  styleUrl: './usager.component.css'
})
export class UsagerComponent implements OnInit {

    usagerData: any = [];
    columnsUsager: string[] = ['id', 'nom', 'prenom', 'age', 'username'];

    constructor(private usagerService: UsagerService){}

    ngOnInit(): void {
      this.loadUsager();
    }

    loadUsager() {
      this.usagerService.fetchAllUsager().subscribe((data: any) => {
        this.usagerData = data[0];
      });
    }

    
}
