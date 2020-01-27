import {
  ChatGetMessages,
  ChatModel,
  ChatNewConnection,
  ChatNewMessage,
  ChatNewUser,
  ChatRequestMessages, ChatUserChangeName,
  ChatUserModel
} from '../actions/chat-actions';
import {Action, NgxsOnInit, State, StateContext, Store} from '@ngxs/store';
import {SendWebSocketMessage} from '@ngxs/websocket-plugin';

export class ChatUsersModel {
  model: {
    users: ChatUserModel[]
  };
}


@State<ChatModel>({
  name: 'chat',
  defaults: {
    model: {
      chatMessages: []
    }
  }
})
export class ChatState implements NgxsOnInit {

  constructor(private store: Store) {

  }

  @Action(ChatNewMessage)
  chatNewMessage(
    {getState, patchState, setState}: StateContext<ChatModel>,
    {payload}: ChatNewMessage) {
    console.log(payload);
    const state = getState();
    const messages = state.model.chatMessages.slice();
    messages.push(payload);
    patchState({...state, model: {chatMessages: messages}});
  }

  @Action(ChatRequestMessages)
  chatRequestMessages({getState}: StateContext<ChatModel>) {
    const state = getState();
    const event = new SendWebSocketMessage({
      type: 'chatSendMessages',
      model: {
        messages: state.model.chatMessages
      }
    });
    this.store.dispatch(event);
  }

  @Action(ChatGetMessages)
  chatGetMessages({getState, patchState}: StateContext<any>, {payload}: ChatGetMessages) {
    const state = getState();
    // console.log(state.model.chatMessages.slice());
    // console.log(payload.messages);
    let messages = state.model.chatMessages.slice().concat(payload.messages);

    const messageHelper: any = {};
    messages.forEach(m => {
      messageHelper[m.id] = m;
    });
    messages = [];
    Object.keys(messageHelper).forEach(mk => {
      messages.push(messageHelper[mk]);
    });


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
    const qrImage = payload.model.qrImage;
    patchState({...state, model: {id, qrImage}});
  }


  ngxsOnInit(ctx?: StateContext<any>): void | any {
    return undefined;
  }
}


@State<ChatUsersModel>({
  name: 'chatUsers',
  defaults: {
    model: {
      users: []
    }
  }
})
export class ChatUsersState implements NgxsOnInit {
  @Action(ChatNewUser)
  chatNewUser({getState, patchState, setState}: StateContext<ChatUsersModel>,
              {payload}: ChatNewUser) {

    const state = getState();
    let users = [...state.model.users];
    users.push(payload);
    const usersHelper = {};
    users.forEach(u => {
      usersHelper[u.model.id] = u;
    });
    users = [];
    Object.keys(usersHelper).forEach(uk => {
      users.push(usersHelper[uk]);
    });
    patchState({...state, model: {users}});
    console.log(usersHelper);
  }

  @Action(ChatUserChangeName)
  chatUserChangeName({getState, patchState, setState}: StateContext<ChatUsersModel>,
                     {payload}: ChatUserChangeName) {

    const state = getState();
    let users = [...state.model.users];
    // users.push(payload);
    const usersHelper = {};
    users.forEach(u => {
      usersHelper[u.model.id] = u;
    });
    usersHelper[payload.model.id] = payload
    users = [];
    Object.keys(usersHelper).forEach(uk => {
      users.push(usersHelper[uk]);
    });
    patchState({...state, model: {users}});
    console.log(usersHelper);
  }


  ngxsOnInit(ctx?: StateContext<any>): void | any {
    return undefined;
  }
}


// TODO: state with active users

