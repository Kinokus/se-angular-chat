export class Message {
  id: string;
  text: string;
}
export class MessageStateServerModel {
  id: string;
  text: string;
}

export interface MessageStateModel {
  model: MessageStateServerModel;
  // editMessageForm: any;
}
