import {Component, OnInit} from '@angular/core';
import {ChatMessageModel} from '../actions/chat-actions';
import {Store} from '@ngxs/store';
import {ConnectWebSocket} from '@ngxs/websocket-plugin';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {


  constructor(private store: Store) {

  }

  ngOnInit() {
    console.log(MessageService.chatUrl);
    this.store.dispatch(new ConnectWebSocket({url: MessageService.chatUrl}));
  }

}
