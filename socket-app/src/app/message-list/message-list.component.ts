import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Select} from '@ngxs/store';
import {MessageService} from '../services/message.service';
import {MessageListState} from '../states/state';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, OnDestroy {
  public messages: Observable<string[]>;
  public currentMsgId: string;
  private _msgSub: Subscription;

  @Select(MessageListState.lastTenMessages) recentMessages$: Observable<string[]>;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messages = this.messageService.messages;
    this._msgSub = this.messageService.currentMessage.subscribe(msg => this.currentMsgId = msg.id);
  }

  ngOnDestroy() {
    this._msgSub.unsubscribe();
  }

  public loadMsg(id: string) {
    this.messageService.getMessage(id);
  }

  public newMsg() {
    this.messageService.newMessage();
  }


  // Stream of the entire Document List State
  @Select(MessageListState) messages$: Observable<string[]>;

  // @Select doesn't need a parameter if the name of the
  // property matches the name of the state you're selecting.
  @Select() messageList$: Observable<string[]>;
  // You can also use a function to get the slice of state you need.
  // @Select(state => state.documentList): Observable<string[]>;
  // @Select(state => state.messageList): Observable<string[]>;


}
