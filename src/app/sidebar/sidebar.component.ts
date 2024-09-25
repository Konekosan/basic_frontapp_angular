import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../_module/Material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';
import { Usager } from '../_model/usager.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  isLogged: boolean = false;
  usager: Usager;

  constructor(private loginService:LoginService) {

  }

  ngOnInit(){
    this.loginService.loggedIn$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
  }

  routes = [
    { label: 'Home', path: '' },
    { label: 'Admin', path: 'admin' },
    { label: 'Observable', path: 'observable' },
    { label: 'Usager', path: 'usager' },
    { label: 'Poo training', path: 'poo'}
  ];

}
