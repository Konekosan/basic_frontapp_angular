import { Component } from '@angular/core';
import { MessageBarService } from '../../_service/message-bar/message-bar.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../_module/Material.module';

@Component({
  selector: 'app-message-bar',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './message-bar.component.html',
  styleUrl: './message-bar.component.css'
})
export class MessageBarComponent {

  message: string = '';
  toolbarClass: string = '';

  constructor(private messageBarService: MessageBarService){
    this.messageBarService.messageState.subscribe((state) => {
      this.message = state.message;
      this.toolbarClass = state.type === 'success' ? 'success-toolbar' : 'error-toolbar';
    });
  }

  closeBar() {
    this.message = '';
    this.toolbarClass = '';
  }

}
