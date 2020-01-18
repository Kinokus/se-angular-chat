export class AddMessage {
  static readonly type = '[Message List] Add Message'; // required
}

export class MessageEditedFromServer {
  static readonly type = '[Message] Edited From Server';
  constructor(public messageText: string) { }
}
