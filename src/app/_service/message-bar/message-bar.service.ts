import { Injectable } from '@angular/core';
import { MessageState } from '../../_model/message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageBarService {
  private messageSubject = new Subject<MessageState>();
  public messageState = this.messageSubject.asObservable();

  constructor() { }

  showMessage(message: string, type: 'success' | 'error') {
    this.messageSubject.next({ message, type });
  }
}
