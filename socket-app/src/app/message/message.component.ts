import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import {Message} from "../models/message";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  message: Message;
  private _msgSub: Subscription;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this._msgSub = this.messageService.currentMessage.pipe(
      startWith({ id: '', text: 'Select an existing document or create a new one to get started'})
    ).subscribe(message => this.message = message);
  }

  ngOnDestroy() {
    this._msgSub.unsubscribe();
  }

  editMsg() {
    this.messageService.editMessage(this.message);
  }


}
