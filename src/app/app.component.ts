import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Basic Angular';
}
