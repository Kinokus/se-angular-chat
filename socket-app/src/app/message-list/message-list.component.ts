import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {MessageService} from "../services/message.service";


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, OnDestroy {
  public messages: Observable<string[]>;
  public currentMsgId : string;
  private _msgSub: Subscription;

  constructor(private messageService: MessageService) { }

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

}
