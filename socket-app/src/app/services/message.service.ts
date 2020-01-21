import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Message, MessageStateServerModel} from '../models/message';
import {Store} from '@ngxs/store';
import {SendWebSocketMessage} from '@ngxs/websocket-plugin';

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

  constructor(private store: Store) {
  }

  // constructor(private socket: Socket, private store: Store) {
  // }


  getMessage(id: string) {
    const event = new SendWebSocketMessage({
      type: 'getMsg',
      model: {
        id,
        text: ''
      }
    });
    this.store.dispatch(event);

    // this.socket.emit('getMsg', id);
  }

  newMessage() {
    const event = new SendWebSocketMessage({
      type: 'addMsg',
      model: {
        id: MessageService.msgId(),
        text: ''
      }
    });
    this.store.dispatch(event);

    // this.socket.emit('addMsg', {id: MessageService.msgId(), text: ''});
  }

  editMessage(message: Message) {
    // console.log(message);
    // this.socket.emit('editMsg', message);
  }

  editMessageFromUi(model: MessageStateServerModel) {
    // this.socket.emit('editMsgFromUi', {message, ininitiator: true});
    const event = new SendWebSocketMessage({
      type: 'editMsgFromUi',
      model
    });
    this.store.dispatch(event);
  }

  // getMessagesFromServer(params): Promise<any> {
  //   // get messages
  //   return new Promise<any>(resolve => {
  //     resolve(this.socket.fromEvent<string[]>('messages'));
  //   });
  // }

  connectMessagesSocket() {
    // return this.socket.fromEvent<string[]>('messages');
  }

  connectMessageSocket() {
    // return this.socket.fromEvent<MessageStateServerModel>('message');
  }


}

