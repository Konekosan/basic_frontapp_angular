import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-noexists',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './noexists.component.html',
  styleUrl: './noexists.component.css'
})
export class NoexistsComponent {

}
