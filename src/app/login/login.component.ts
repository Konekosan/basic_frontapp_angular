import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../_module/Material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MessageService } from '../_service/message.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule,
            ReactiveFormsModule, 
            CommonModule
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form: FormGroup = new FormGroup({
    username: new FormControl('', []),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  token: string | null = null;

  constructor(private loginService: LoginService, 
              private router:Router,
              private messageService: MessageService) {}

  ngOnInit() {
    this.errorMessage = this.messageService.getMessage();
  }

  onSubmit() {
    const loginForm = this.form.value;
    this.loginService.login(loginForm.username, loginForm.password).subscribe(
      response => {
        this.token = response.access_token;
        console.log('Login Sucessful', response);
    },
    error => {
      console.log('Login failed', error);
    });
  }

  isFieldInvalid(param: string) {
    return null;
  }
  
}
