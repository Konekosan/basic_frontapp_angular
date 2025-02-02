import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule, Validators  } from '@angular/forms';
import { UsagerService } from '../../_service/usager/usager.service';
import { AddUsagerForm } from '../../_model/usager.model';

@Component({
  selector: 'app-add-usager-modale',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-usager-modale.component.html',
  styleUrl: './add-usager-modale.component.css'
})
export class AddUsagerModaleComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<AddUsagerModaleComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  showErrorMatchPassword: boolean = false;
  usagerForm: FormGroup;

  constructor(private fb: FormBuilder, private usagerService: UsagerService){
    this.usagerForm = this.fb.group({
      nom: [this.data.nom, Validators.required],
      prenom: [this.data.prenom, Validators.required],
      age: [this.data.age, [Validators.required, Validators.min(0)]],
      username: [this.data.login, Validators.required],
      hashed_pwd: [this.data.password, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [this.data.confirmPassword, Validators.required]
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.usagerForm.invalid || !this.passwordsMatch()) {
      this.showErrorMatchPassword = true;
      return;
    }
    const formData = { ...this.usagerForm.value };
    delete formData.confirmPassword;

    const datas: AddUsagerForm = {parameter: formData};

    this.usagerService.addUsager(datas).subscribe(
      response => {
        this.dialogRef.close(response[0]);
      },
      error => {
        console.log(error);
        this.dialogRef.close();
      }
    )
  }

  closeModale(): void {
    this.dialogRef.close();
  }

  passwordsMatch(): boolean {
    return this.usagerForm.get('hashed_pwd')?.value === this.usagerForm.get('confirmPassword')?.value;
  }
}
