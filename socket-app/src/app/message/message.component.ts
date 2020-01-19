import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { startWith } from 'rxjs/operators';
import {Message} from '../models/message';
import {MessageService} from '../services/message.service';
import {MessageStateModel} from '../states/state';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  message: Message;
  private _msgSub: Subscription;
  currentMessage$: Observable<MessageStateModel>;

  constructor(private messageService: MessageService, private store: Store) {
    this.currentMessage$ = this.store.select(state => state.message);

  }

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
