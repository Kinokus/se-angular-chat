import {ChatModel, ChatNewConnection, ChatNewMessage, ChatUserModel} from '../actions/chat-actions';
import {Action, NgxsOnInit, State, StateContext} from '@ngxs/store';

@State<ChatModel>({
  name: 'chat',
  defaults: {
    model: {
      chatMessages: []
    }
  }
})
export class ChatState implements NgxsOnInit {

  // TODO: send message

  @Action(ChatNewMessage)
  chatNewMessage(
    {getState, patchState, setState}: StateContext<ChatModel>,
    {payload}: ChatNewMessage) {
    const state = getState();
    const messages = state.model.chatMessages.slice();
    messages.push(payload);
    patchState({...state, model: {chatMessages: messages}});
  }


  // TODO: get all messages
  // TODO: send all messages
  // TODO: online typing


  ngxsOnInit(ctx?: StateContext<any>): void | any {
    return undefined;
  }
}


@State<ChatUserModel>({
  name: 'chatUser',
  defaults: {
    model: {
      id: '',
      username: '%username%'
    }
  }
})
export class ChatUserState implements NgxsOnInit {

  @Action(ChatNewConnection)
  chatNewConnection(
    {getState, patchState, setState}: StateContext<ChatUserModel>,
    {payload}: ChatNewConnection) {

    const state = getState();
    const id = payload.model.id;
    patchState({...state, model: {id}});
  }


  ngxsOnInit(ctx?: StateContext<any>): void | any {
    return undefined;
  }
}


// TODO: state with active users

