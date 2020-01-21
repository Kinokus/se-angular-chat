import { Component, OnInit } from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ChatState} from '../states/chat-state';
import {ChatModel} from '../actions/chat-actions';

@Component({
  selector: 'app-chat-message-window',
  templateUrl: './chat-message-window.component.html',
  styleUrls: ['./chat-message-window.component.scss']
})
export class ChatMessageWindowComponent implements OnInit {

  constructor() { }
  @Select(ChatState) chat$: Observable<ChatModel>;
  ngOnInit() {
  }

}
