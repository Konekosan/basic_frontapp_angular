import { Component, OnInit, inject, model } from '@angular/core';
import { UsagerService } from '../../_service/usager/usager.service';
import { MaterialModule } from '../../_module/Material.module';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUsagerModaleComponent } from '../../modale/add-usager-modale/add-usager-modale.component';
import { ConfirmationModaleComponent } from '../../modale/confirmation-modale/confirmation-modale.component';
import { UsagerEvent, Usager } from '../../_model/usager.model';

@Component({
  selector: 'app-usager',
  standalone: true,
  imports: [MaterialModule, CommonModule, MatDialogModule, AddUsagerModaleComponent],
  templateUrl: './usager.component.html',
  styleUrl: './usager.component.css'
})
export class UsagerComponent implements OnInit {

  usagerData: Usager[] = [];
  columnsUsager: string[] = ['id', 'nom', 'prenom', 'age', 'username', 'actions'];

  readonly dialog = inject(MatDialog);
  readonly nom = model('');
  readonly prenom = model('');
  readonly age = model('');
  readonly login = model('');
  readonly password = model('');

  constructor(private usagerService: UsagerService){}

  ngOnInit(): void {
    this.loadUsager();
  }

  loadUsager(): void {
    this.usagerService.fetchAllUsager().subscribe((data: any) => {
      this.usagerData = data[0];
    });
  }

  addUsagerModale(): void {
    const dialogRef = this.dialog.open(AddUsagerModaleComponent, {
      data: { nom: this.nom(), 
              prenom: this.prenom(),
              age: this.age(),
              login: this.login(),
              password: this.password(),
            },
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usagerData.push(result);
        this.usagerData = [...this.usagerData];
      }
    });
  }

  deleteBoard(event: UsagerEvent): void {
    const usagerId = event.id;
    const dialogRef = this.dialog.open(ConfirmationModaleComponent, {
      data: 'delete'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.usagerService.deleteUsagerById(usagerId).subscribe(
        response => {
          this.usagerData = this.usagerData.filter((usager: any) => usager.id !== usagerId);
        });
      }
    });
  }

  editBoard(event: any){
    console.log(event);
  }
}
