import {
  ChatGetMessages, ChatGetSocketUrl,
  ChatModel,
  ChatNewConnection,
  ChatNewMessage,
  ChatNewUser,
  ChatRequestMessages, ChatRequestUsers, ChatSocketConnect, ChatUserChangeName,
  ChatUserModel
} from '../actions/chat-actions';
import {Action, NgxsOnInit, State, StateContext, Store} from '@ngxs/store';
import {ConnectWebSocket, SendWebSocketMessage, WebSocketConnected, WebSocketDisconnected} from '@ngxs/websocket-plugin';
import {MessageService} from '../services/message.service';
import {HttpClient} from '@angular/common/http';

export class ChatUsersModel {
  model: {
    users: ChatUserModel[]
  };
}


@State<ChatModel>({
  name: 'chat',
  defaults: {
    model: {
      chatMessages: [],
      socketUrl: ''

    }
  }
})
export class ChatState implements NgxsOnInit {

  constructor(private store: Store, private http: HttpClient) {
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
  async chatGetMessages({getState, patchState}: StateContext<any>, {payload}: ChatGetMessages) {
    const state = getState();
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


  // TODO: online typing

  @Action(WebSocketConnected)
  async socketConnected(ctx: StateContext<any>, action: WebSocketConnected) {
    console.log('WebSocketConnected', action);
  }

  @Action(WebSocketDisconnected)
  async socketDisconnected(ctx: StateContext<any>, action: WebSocketDisconnected) {
    console.log('WebSocketDisconnected', action);
    this.store.dispatch(new ChatSocketConnect());
  }


  @Action(ChatGetSocketUrl)
  async chatGetSocketUrl({getState, patchState}: StateContext<ChatModel>, action: ChatGetSocketUrl) {
    const state = getState();
    const model = state.model;
    // get url
    const url = `http://${window.location.hostname}/chatUrl`;
    return this.http.get(url)
      .toPromise()
      .then((resp: { chatUrl: string }) => {
        model.socketUrl = resp.chatUrl;
        MessageService.chatUrl = resp.chatUrl;

        patchState({...state, model: {socketUrl: resp.chatUrl}});
        



      })
      .catch((err) => {
        console.log(err);
      });


  }

  ngxsOnInit(ctx?: StateContext<any>): void | any {
    return undefined;
  }
}


@State<ChatUserModel>({
  name: 'chatUser',
  defaults: {
    model: {
      id: null,
      username: '%username%'
    }
  }
})
export class ChatUserState implements NgxsOnInit {

  constructor(private store: Store) {
  }

  @Action(ChatSocketConnect)
  chatSocketConnect(
    {getState, patchState, setState}: StateContext<ChatUserModel>) {
    console.log(MessageService.chatUrl);
    const state = getState();
    const model = state.model;
    if (model.id) {
      this.store.dispatch(new ConnectWebSocket({url: MessageService.chatUrl + `/${model.id}/${encodeURI(model.username)}`}));
    } else {
      this.store.dispatch(new ConnectWebSocket({url: MessageService.chatUrl}));
    }

    // TODO: NEED normal dispatch for chat url

  }


  @Action(ChatNewConnection)
  chatNewConnection(
    {getState, patchState, setState}: StateContext<ChatUserModel>,
    {payload}: ChatNewConnection) {

    const state = getState();

    // if (state.model.id) {
    //   const event = new SendWebSocketMessage({
    //     type: 'chatUserChangeName',
    //     model: state.model
    //   });
    //   this.store.dispatch(event);
    // } else {
    patchState({...state, model: payload.model});
    // }
  }


  @Action(ChatUserChangeName)
  chatUserChangeName({getState, patchState, setState}: StateContext<ChatUserModel>,
                     {payload}: ChatUserChangeName) {
    const state = getState();
    if (state.model.id === payload.model.id) {
      payload.model.qrImage = state.model.qrImage;
      patchState({...state, model: payload.model});
    }
  }


  @Action(ChatRequestUsers)
  chatRequestUsers({getState}: StateContext<ChatUserModel>) {
    const state = getState();
    const event = new SendWebSocketMessage({
      type: 'chatUserChangeName',
      model: state.model
    });
    this.store.dispatch(event);
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
    const usersHelper = {};
    users.forEach(u => {
      usersHelper[u.model.id] = u;
    });
    usersHelper[payload.model.id] = payload;
    users = [];
    Object.keys(usersHelper).forEach(uk => {
      users.push(usersHelper[uk]);
    });
    patchState({...state, model: {users}});
  }


  ngxsOnInit(ctx?: StateContext<any>): void | any {
    return undefined;
  }
}


// TODO: state with active users
// TODO: on socket disconnect get URL and reconnect again
// TODO: state with current selected user
