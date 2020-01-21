export enum ChatActionsEnum {
  ChatNewConnection = '[Chat] New Connection',
  ChatNewMessage = '[Chat] New Message',
  ChatRequestMessages = '[Chat] Request Messages'
}

export class ChatMessageModel {
  model: {
    text: string;
    id: string;
    senderId: string;
  };
}

export class ChatModel {
  model: {
    chatMessages: ChatMessageModel[]
  };
}

export class ChatUserModel {
  model: {
    id: string;
    username?: string;
  };
}


export class ChatNewMessage {
  static readonly type = ChatActionsEnum.ChatNewMessage; // required
  constructor(public payload: ChatMessageModel) {
  }
}

export class ChatNewConnection {
  static readonly type = ChatActionsEnum.ChatNewConnection; // required
  constructor(public payload: ChatUserModel) {
  }
}

export class ChatRequestMessages {
  static readonly type = ChatActionsEnum.ChatRequestMessages; // required
}
