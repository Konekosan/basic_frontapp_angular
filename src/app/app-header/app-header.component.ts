import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../_module/Material.module';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from '../pages/sidebar/sidebar.component';
import { LoginService } from '../_service/login/login.service';
import { Usager } from '../_model/usager.model';
import { UsagerService } from '../_service/usager/usager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})

export class AppHeaderComponent implements OnInit {

  usager: Usager;

  constructor(private loginService: LoginService, private router: Router,
              private usagerService: UsagerService) {}

  ngOnInit(): void {
    this.usager = this.usagerService.getUserData();
    this.loginService.currentUserInfo.subscribe(usager => {
      if (usager) {
        this.usager = usager;
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

}
