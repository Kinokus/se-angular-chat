import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Message, MessageStateServerModel} from '../models/message';
import {Store} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // currentMessage = this.socket.fromEvent<Message>('message');
  // messages = this.socket.fromEvent<string[]>('messages');

  public static msgId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  constructor(private socket: Socket, private store: Store) {
  }


  getMessage(id: string) {
    this.socket.emit('getMsg', id);
  }

  newMessage() {
    this.socket.emit('addMsg', {id: MessageService.msgId(), text: ''});
  }

  editMessage(message: Message) {
    this.socket.emit('editMsg', message);
  }

  // getMessagesFromServer(params): Promise<any> {
  //   // get messages
  //   return new Promise<any>(resolve => {
  //     resolve(this.socket.fromEvent<string[]>('messages'));
  //   });
  // }

  connectMessagesSocket() {
    return this.socket.fromEvent<string[]>('messages');
  }

  connectMessageSocket() {
    return this.socket.fromEvent<MessageStateServerModel>('message');
  }
}
