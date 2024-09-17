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
    userName: new FormControl('', []),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  username: string = '';
  password: string = '';
  errorMessage: string = 't moche';

  constructor(private loginService: LoginService, 
              private router:Router,
              private messageService: MessageService) {}

  ngOnInit() {
    this.errorMessage = this.messageService.getMessage();
  }

  onSubmit() {
    if (this.loginService.login(this.form.value.userName,this.form.value.password)) {
      console.log('Connexion réussie');
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Nom d\'utilisateur ou mot de passe incorrect');
    }
  }

  isFieldInvalid(param: string) {
    return null;
  }
}
