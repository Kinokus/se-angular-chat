import {Component, OnInit} from '@angular/core';
import {ChatMessageModel, ChatSocketConnect} from '../actions/chat-actions';
import {Select, Store} from '@ngxs/store';
import {ConnectWebSocket} from '@ngxs/websocket-plugin';
import {MessageService} from '../services/message.service';
import {ChatUserState} from '../states/chat-state';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {


  constructor(private store: Store) {

  }

  ngOnInit() {



    this.store.dispatch(new ChatSocketConnect());
    // // TODO: NEED normal dispatch

    // console.log(MessageService.chatUrl);
    // this.store.selectOnce(ChatUserState)
    //   .toPromise()
    //   .then((user) => {
    //     console.log(user);
    //     if (user.model.id) {
    //       this.store.dispatch(new ConnectWebSocket({url: MessageService.chatUrl + `/${user.model.id}/${encodeURI(user.model.username)}`}));
    //     } else {
    //       this.store.dispatch(new ConnectWebSocket({url: MessageService.chatUrl}));
    //     }
    //   });

  }

}
