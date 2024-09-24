import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../_module/Material.module';
import { ActivatedRoute } from '@angular/router';
import { UsagerService } from '../_service/usager.service';
import { Usager } from '../_model/usager.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  usager: Usager;

  constructor(private loginService: LoginService, 
              private router: Router,
              private route: ActivatedRoute,
              private usagerService: UsagerService
             ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.usagerService.fetchUsagerById(userId).subscribe(
        (data: Usager[]) => {
          this.usager = data[0];
        }
      )
    });    
  }



  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
