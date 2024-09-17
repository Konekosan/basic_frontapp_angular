import { Component } from '@angular/core';
import { MaterialModule } from '../_module/Material.module';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
