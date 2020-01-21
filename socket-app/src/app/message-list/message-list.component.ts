import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {MessageService} from '../services/message.service';
import {MessageListState, MessageListStateModel, MessageState, } from '../states/state';
import {MessageStateModel} from '../models/message';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, OnDestroy {
  public messages: Observable<string[]>;
  public currentMsgId: string;


  @Select(MessageListState.lastTenMessages) recentMessages$: Observable<string[]>;
  @Select(MessageListState) messageList$: Observable<MessageListStateModel>;
  @Select(MessageState) message$: Observable<MessageStateModel>;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {  }

  ngOnDestroy() {  }

  public loadMsg(id: string) {
    this.messageService.getMessage(id);
  }

  public newMsg() {
    this.messageService.newMessage();
  }


}
