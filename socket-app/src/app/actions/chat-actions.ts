export enum ChatActionsEnum {
  ChatGetSocketUrl = '[Chat] Get Socket Url',
  ChatUserChangeName = '[Chat] User Change Name',
  ChatRequestUsers = '[Chat] Request Users',
  ChatNewConnection = '[Chat] New Connection',
  ChatNewUser = '[Chat] New User',
  ChatNewMessage = '[Chat] New Message',
  ChatRequestMessages = '[Chat] Request Messages',
  ChatGetMessages = '[Chat] Get Messages',
  ChatSocketConnect = '[Chat] Socket Connect'
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
    chatMessages?: ChatMessageModel[]
    socketUrl?: string
  };
}

export class ChatUserModel {
  model: {
    id: string;
    username?: string;
    qrImage?: string;
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

export class ChatNewUser {
  static readonly type = ChatActionsEnum.ChatNewUser; // required
  constructor(public payload: ChatUserModel) {
  }
}

export class ChatUserChangeName {
  static readonly type = ChatActionsEnum.ChatUserChangeName; // required
  constructor(public payload: ChatUserModel) {
  }
}


export class ChatGetMessages {
  static readonly type = ChatActionsEnum.ChatGetMessages; // required
  constructor(public payload: { messages: ChatMessageModel[] }) {
  }
}

export class ChatRequestMessages {
  static readonly type = ChatActionsEnum.ChatRequestMessages; // required
}

export class ChatRequestUsers {
  static readonly type = ChatActionsEnum.ChatRequestUsers; // required
}

export class ChatSocketConnect {
  static readonly type = ChatActionsEnum.ChatSocketConnect; // required
}

export class ChatGetSocketUrl {
  static readonly type = ChatActionsEnum.ChatGetSocketUrl; // required
}

