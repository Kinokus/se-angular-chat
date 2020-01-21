export enum ChatActionsEnum {
  ChatNewMessage = '[Chat] New Message',
}

export class ChatAnonymousMessageModel {
  text: string;
}

export class ChatMessageModel extends ChatAnonymousMessageModel {
  id: string;
  authorId: string;
}

export class ChatNewAnonymousMessage {
  static readonly type = ChatActionsEnum.ChatNewMessage; // required
  constructor(public payload: ChatAnonymousMessageModel) {
  }
}

export class ChatNewMessage {
  static readonly type = ChatActionsEnum.ChatNewMessage; // required
  constructor(public payload: ChatMessageModel) {
  }
}
