import { Component, OnInit } from '@angular/core';
import {Select} from '@ngxs/store';
import {ChatState, ChatUsersModel, ChatUsersState} from '../states/chat-state';
import {Observable} from 'rxjs';
import {ChatModel} from '../actions/chat-actions';

@Component({
  selector: 'app-chat-users-window',
  templateUrl: './chat-users-window.component.html',
  styleUrls: ['./chat-users-window.component.scss']
})
export class ChatUsersWindowComponent implements OnInit {

  constructor() { }
  @Select(ChatUsersState) users$: Observable<ChatUsersModel>;
  ngOnInit() {
  }

}
