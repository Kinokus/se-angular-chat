import {State, Action, StateContext, Selector} from '@ngxs/store'
import {Message} from "../models/message";
import {MessageService} from "../services/message.service";
import {MessageEditedFromServer} from "../actions/actions";

export interface MessageStateModel {
  id: string;
  text: string;
}

@State<MessageStateModel>({
  name: 'document', // required
  defaults: { // optional: DocumentStateModel
    id: '',
    text: 'Select an existing document or create a new one to get started'
  }
})
export class MessageState {
  @Action(MessageEditedFromServer)
  editMessage(ctx: StateContext<MessageStateModel>, action: MessageEditedFromServer) {
    const state = ctx.getState(); // always returns the freshest slice of state
    ctx.setState({
      ...state,
      text: action.messageText
    }); // the spread operator is shorthand for Object.assign({}, state, { doc: docText });
  }

}

@State<string[]>({
  name: 'messageList',
  defaults: ['']
})
export class MessageListState {
  constructor(private messageService: MessageService) {
  }

  @Selector()
  static lastTenMessages(state: string[]) {
    return state.slice(-10);
  }
}

/*
* @State<string[]>( )
export class DocumentListState {
  @Selector()
  static lastTenDocuments(state: string[]) {
    return state.slice(-10);
  }
}
* */
