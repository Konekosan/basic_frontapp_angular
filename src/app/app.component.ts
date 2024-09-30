import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageBarComponent } from './shared/message-bar/message-bar.component';
import { MaterialModule } from './_module/Material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageBarComponent, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Basic Angular';
}
