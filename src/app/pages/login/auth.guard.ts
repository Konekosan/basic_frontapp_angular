import { LoginService } from '../../_service/login/login.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MessageService } from '../../_service/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, 
              private loginService: LoginService,
              private messageService: MessageService) {}

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.messageService.setMessage('Vous devez être connecté pour accéder à cette page.');
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
