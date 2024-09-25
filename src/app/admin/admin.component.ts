import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../_module/Material.module';
import { AdminService } from '../_service/admin/admin.service';
import { Role } from '../_model/role.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  selectedRole: any;
  roles: Role[] = [];

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.adminService.fetchAllRoles().subscribe(
      (response: any) => {
        this.roles = response[0];
    });
  }

}
