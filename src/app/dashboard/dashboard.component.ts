import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../_module/Material.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private loginService: LoginService, private router: Router) {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
