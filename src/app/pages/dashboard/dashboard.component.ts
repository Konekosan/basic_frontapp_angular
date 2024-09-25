import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../_service/login/login.service';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../_module/Material.module';
import { ActivatedRoute } from '@angular/router';
import { UsagerService } from '../../_service/usager/usager.service';
import { Usager } from '../../_model/usager.model';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from '../../app-header/app-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule, AppHeaderComponent,
    SidebarComponent, RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  usager: Usager;
  private userSubscription: Subscription;

  constructor( private loginService: LoginService ) {}

  ngOnInit(): void {
    this.loginService.currentUserInfo.subscribe(usager => {
      if (usager) {
        this.usager = usager;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }    
  }

}
