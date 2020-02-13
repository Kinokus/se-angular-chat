import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SendWebSocketMessage} from '@ngxs/websocket-plugin';
import {Select, Store} from '@ngxs/store';
import {ChatUserState} from '../states/chat-state';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatUserModel} from '../actions/chat-actions';

@Component({
  selector: 'app-chat-message-input',
  templateUrl: './chat-message-input.component.html',
  styleUrls: ['./chat-message-input.component.scss']
})
export class ChatMessageInputComponent implements OnInit {
  private chatMessageForm: FormGroup;

  constructor(private store: Store) {

  }

  @Select(ChatUserState) user$: BehaviorSubject<ChatUserModel>;

  ngOnInit() {
    this.chatMessageForm = new FormGroup({
      text: new FormControl()
    });
  }

  sendMessage() {
    // todo : move to state
    const event = new SendWebSocketMessage({
      type: 'chatSendMessage',
      model: {
        text: this.chatMessageForm.get('text').value
      }
    });
    this.store.dispatch(event);
    this.chatMessageForm.get('text').setValue('');
  }

}
