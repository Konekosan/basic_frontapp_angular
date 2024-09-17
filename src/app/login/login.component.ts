import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../_module/Material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {
    // Initialisation du FormGroup
    this.form = new FormGroup({
      userName: new FormControl('', []),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(){

  }

  isFieldInvalid(param: string) {

  }
}
