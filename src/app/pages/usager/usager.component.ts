import { Component, OnInit, inject, model } from '@angular/core';
import { UsagerService } from '../../_service/usager/usager.service';
import { MaterialModule } from '../../_module/Material.module';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUsagerModaleComponent } from '../../modale/add-usager-modale/add-usager-modale.component';
import { ConfirmationModaleComponent } from '../../modale/confirmation-modale/confirmation-modale.component';
import { UsagerEvent, Usager } from '../../_model/usager.model';
import { MessageBarComponent } from '../../shared/message-bar/message-bar.component';
import { MessageBarService } from '../../_service/message-bar/message-bar.service';
import { MESSAGES } from '../../shared/message';

@Component({
  selector: 'app-usager',
  standalone: true,
  imports: [MaterialModule, CommonModule, MatDialogModule, 
            AddUsagerModaleComponent, MessageBarComponent],
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

  constructor(private usagerService: UsagerService,
              private messageBarService: MessageBarService
             ){}

  ngOnInit(): void {
    this.loadUsager();
  }

  loadUsager(): void {
    this.usagerService.fetchAllUsager().subscribe((data: any) => {
      this.usagerData = data.users;
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
        this.messageBarService.showMessage(MESSAGES.SUCCESS.USAGER_CREATED, 'success');
      }
    });
  }

  deleteUsager(event: UsagerEvent): void {
    const usagerId = event.id;
    const dialogRef = this.dialog.open(ConfirmationModaleComponent, {
      data: 'delete'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.usagerService.deleteUsagerById(usagerId).subscribe(
        response => {
          this.usagerData = this.usagerData.filter((usager: any) => usager.id !== usagerId);
          this.messageBarService.showMessage(MESSAGES.SUCCESS.USAGER_DELETED, 'success');
        });
      }
    });
  }

  editBoard(event: any){
    console.log(event);
  }
}
