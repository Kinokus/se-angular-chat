import {State, Action, StateContext, Selector, NgxsOnInit} from '@ngxs/store';
import {MessageService} from '../services/message.service';
import {
  ClearMessageList,
  GetMessagesFormServer,
  MessageEditedFromServer,
  AddMessageId,
  GetMessagesFormServerSuccess, ConnectToMessages, ConnectToMessage, GetMessageFormServerSuccess, MessageEditedFromUi
} from '../actions/actions';
import {debounceTime} from 'rxjs/operators';
import {MessageStateModel, MessageStateServerModel} from '../models/message';
import {WebSocketConnected} from '@ngxs/websocket-plugin';


@State<MessageStateModel>({
  name: 'message',
  defaults: {
    model: {id: '', text: ''}
  }
})
export class MessageState implements NgxsOnInit {
  constructor(private messageService: MessageService) {
  }


  @Action(WebSocketConnected)
  webSocketConnected(ctx: StateContext<MessageStateModel>, action: WebSocketConnected) {
    // console.log(ctx);
    // console.log(action);
    // const state = ctx.getState(); // always returns the freshest slice of state
    // ctx.setState({
    //   ...state,
    //   model: {text: action.messageText, id: state.model.id}
    // });
  }

  @Action(MessageEditedFromServer)
  editMessageFromServer(ctx: StateContext<MessageStateModel>, action: MessageEditedFromServer) {
    const state = ctx.getState(); // always returns the freshest slice of state
    ctx.setState({
      ...state,
      model: {text: action.messageText, id: state.model.id}
    });
  }

  @Action(MessageEditedFromUi)
  editedFromUi(ctx: StateContext<MessageStateModel>, action: MessageEditedFromServer) {
    const state = ctx.getState(); // always returns the freshest slice of state
    ctx.setState({
      ...state,
      model: {text: action.messageText, id: state.model.id}
    });
  }


  @Action(GetMessageFormServerSuccess)
  async getMessageFormServerSuccess(ctx: StateContext<MessageStateModel>, {model}: GetMessageFormServerSuccess) {
    ctx.setState(({model}));
  }


  // @Action(ConnectToMessage)
  // connectToMessage(ctx: StateContext<MessageStateServerModel>) {
  //   const messageSocket = this.messageService.connectMessageSocket();
  //   messageSocket
  //     .pipe()
  //     .subscribe(m => {
  //       console.log(m);
  //       ctx.dispatch(new GetMessageFormServerSuccess(m));
  //     });
  // }

  ngxsOnInit(ctx?: StateContext<any>) {
    ctx.dispatch(new ConnectToMessage());
  }

}

export interface MessageListStateModel {
  ids: string[];
}

@State<MessageListStateModel>({
  name: 'messageList',
  defaults: {ids: []}
})
export class MessageListState implements NgxsOnInit {

  constructor(private messageService: MessageService) {
  }

  @Selector()
  static lastTenMessages(state: string[]) {
    return state.slice(-10);
  }

  @Action(AddMessageId)
  newMessage({getState, patchState}: StateContext<MessageListStateModel>, {payload}: AddMessageId) {
    const state = getState();
    const ids = state.ids.slice();
    ids.push(payload);
    patchState({...state, ids});
  }

  // @Action(GetMessagesFormServer)
  // async getMessagesFormServer(ctx: StateContext<MessageListStateModel>, {payload}: GetMessagesFormServer) {
  //   // const res = await this.messageService.getMessagesFromServer(payload); // params for get request
  //   // ctx.dispatch(new GetMessagesFormServerSuccess(res));
  // }

  @Action(GetMessagesFormServerSuccess)
  async getMessagesFormServerSuccess(ctx: StateContext<MessageListStateModel>, {payload}: GetMessagesFormServerSuccess) {
    const state = ctx.getState();
    ctx.patchState({...state, ids: payload});
  }


  @Action(ClearMessageList)
  clearMessageList({getState, patchState}: StateContext<MessageListStateModel>) {
    const state = getState();
    patchState({...state, ids: []});
  }

  // @Action(ConnectToMessages)
  // connectToMessages(ctx: StateContext<string[]>) {
  //   const messagesSocket = this.messageService.connectMessagesSocket();
  //   messagesSocket
  //     .pipe(debounceTime(500))
  //     .subscribe(m => {
  //       ctx.dispatch(new GetMessagesFormServerSuccess(m));
  //     });
  // }

  ngxsOnInit(ctx?: StateContext<any>) {
    ctx.dispatch(new ConnectToMessages());
  }


}

