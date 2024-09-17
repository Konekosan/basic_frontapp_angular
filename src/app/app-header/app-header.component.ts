import { Component } from '@angular/core';
import { MaterialModule } from '../_module/Material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {

}
