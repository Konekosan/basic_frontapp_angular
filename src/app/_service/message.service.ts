import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message: string = '';

  constructor() { }

  setMessage(msg: string) {
    this.message = msg;
  }

  getMessage(): string {
    const msg = this.message;
    this.clearMessage();
    return msg;
  }

  clearMessage() {
    this.message = '';
  }
}
