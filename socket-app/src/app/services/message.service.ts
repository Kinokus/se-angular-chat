import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  currentMessage = this.socket.fromEvent<Message>('message');
  messages = this.socket.fromEvent<string[]>('messages');

  constructor(private socket: Socket) { }

  getMessage(id: string) {
    this.socket.emit('getMsg', id);
  }

  newMessage() {
    this.socket.emit('addMsg', { id: MessageService.msgId(), doc: '' });
  }

  editMessage(message: Message) {
    this.socket.emit('editMsg', message);
  }

  private static msgId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
