import { Component } from '@angular/core';
import { MaterialModule } from '../_module/Material.module';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  opened=false;
}
