import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../_module/Material.module';

@Component({
  selector: 'app-confirmation-modale',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirmation-modale.component.html',
  styleUrl: './confirmation-modale.component.css'
})
export class ConfirmationModaleComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmationModaleComponent>);
  message: string = '';

  constructor(){
    if (this.data == 'delete') {
      this.message = 'supprimer';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
