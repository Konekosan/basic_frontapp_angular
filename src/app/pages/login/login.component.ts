import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.module';
import { AbstractControl, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../_service/login/login.service';
import { MessageService } from '../../_service/message.service';
import { UsagerService } from '../../_service/usager/usager.service';
import { MessageBarService } from '../../_service/message-bar/message-bar.service';
import { MESSAGES } from '../../shared/message';
import { MessageBarComponent } from '../../shared/message-bar/message-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule,
            ReactiveFormsModule, 
            CommonModule,
            RouterLink,
            MessageBarComponent
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      this.noSpecialCharactersValidator()
    ]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(5)
    ])
  });
  errorMessage: string = '';
  token: string | null = null;

  constructor(private loginService: LoginService, 
              private router: Router,
              private messageService: MessageService,
              private usagerService: UsagerService,
              private messageBarService: MessageBarService
             ){}

  ngOnInit() {
    this.errorMessage = this.messageService.getMessage();
  }

  onSubmit() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    if (username && password && this.form.valid) {
      this.loginService.login(username, password).subscribe(
        (response: any) => {
          this.token = response.token;
          const currentUser = response.user;
          this.usagerService.setUserData(currentUser);
          this.router.navigate(['/dashboard']);
        },
        error => {
          if (error.error.detail.code == 'invalid_credentials'){
            this.messageBarService.showMessage(MESSAGES.ERROR.ERROR_LOGIN,'error');
          } else {
            this.messageBarService.showMessage(MESSAGES.ERROR.ERROR_GENERIC,'error');
          }
        }
      );
    }
  }

  noSpecialCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = /[<>;'"\\\/]/.test(control.value);
      return forbidden ? { 'forbiddenCharacters': { value: control.value } } : null;
    };
  }

  isFieldInvalid(param: string) {
    return null;
  }
  
}
