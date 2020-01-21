import { Component, OnInit } from '@angular/core';
import {Select} from '@ngxs/store';
import {ChatState, ChatUserState} from '../states/chat-state';
import {Observable} from 'rxjs';
import {ChatModel, ChatUserModel} from '../actions/chat-actions';

@Component({
  selector: 'app-chat-user-state',
  templateUrl: './chat-user-state.component.html',
  styleUrls: ['./chat-user-state.component.scss']
})
export class ChatUserStateComponent implements OnInit {

  constructor() { }
  @Select(ChatUserState) user$: Observable<ChatUserState>;
  ngOnInit() {
  }

}
