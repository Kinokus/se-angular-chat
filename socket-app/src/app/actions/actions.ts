import {MessageStateModel} from '../states/state';

export class AddMessageId {
  static readonly type = '[Message List] Add Message'; // required
  constructor(public payload: string) { }
}

export class GetMessagesFormServer {
  static readonly type = '[Message List] Get Messages From Server'; // required
  constructor(public payload: string[]) { }
}

export class GetMessagesFormServerSuccess {
  static readonly type = '[Message List] Get Messages From Server'; // required
  constructor(public payload: string[]) { }
}

export class GetMessageFormServerSuccess {
  static readonly type = '[Message] Get Message From Server'; // required
  constructor(public payload: MessageStateModel) { }
}

export class ClearMessageList {
  static readonly type = '[Message List] Clear List'; // required
}

export class MessageEditedFromServer {
  static readonly type = '[Message] Edited From Server';
  constructor(public messageText: string) { }
}

export class MessageEditedFromUi {
  static readonly type = '[Message] Edited From Server';
  constructor(public messageText: string) { }
}


export class ConnectToMessages {
  static readonly type = '[Message] ConnectToMessages';
}
export class ConnectToMessage {
  static readonly type = '[Message] ConnectToMessage';
}
