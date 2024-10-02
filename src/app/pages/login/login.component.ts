import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.module';
import { ReactiveFormsModule } from '@angular/forms';
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
    username: new FormControl('', []),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  username: string = '';
  password: string = '';
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
    const loginForm = this.form.value;

    if (loginForm.username && loginForm.password) {
      this.loginService.login(loginForm.username, loginForm.password).subscribe(
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

  isFieldInvalid(param: string) {
    return null;
  }
  
}
