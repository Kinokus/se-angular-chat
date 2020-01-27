import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ChatState, ChatUserState} from '../states/chat-state';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatModel, ChatUserModel} from '../actions/chat-actions';
import {FormControl, FormGroup} from '@angular/forms';
import {SendWebSocketMessage} from '@ngxs/websocket-plugin';

@Component({
  selector: 'app-chat-user-state',
  templateUrl: './chat-user-state.component.html',
  styleUrls: ['./chat-user-state.component.scss']
})
export class ChatUserStateComponent implements OnInit {
  private userForm: FormGroup;

  constructor(private store: Store) { }
  @Select(ChatUserState) user$: BehaviorSubject<ChatUserState>;
  ngOnInit() {

    this.userForm = new FormGroup({
      username: new FormControl()
    });

  }

  changeName() {
    const event = new SendWebSocketMessage({
      type: 'chatUserChangeName',
      model: {
        username: this.userForm.get('username').value
      }
    });
    this.store.dispatch(event);

  }
}
