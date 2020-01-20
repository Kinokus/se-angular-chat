import {Component, OnInit, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {debounceTime, startWith} from 'rxjs/operators';
import {Message, MessageStateModel, MessageStateServerModel} from '../models/message';
import {MessageService} from '../services/message.service';
import {MessageState} from '../states/state';
import {Select, Store} from '@ngxs/store';
import {ConnectToMessages} from '../actions/actions';
import {FormControl, FormGroup} from '@angular/forms';
import {SendWebSocketMessage} from '@ngxs/websocket-plugin';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  @Select(MessageState) message$: BehaviorSubject<MessageStateModel>;
  messageForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private store: Store,
    // private webSocketSubject: WebSocketSubject<any>
  ) {

  }

  sendMessage(id: string, text: string) {
    const event = new SendWebSocketMessage({
      type: 'addMsg',
      model: {
        id,
        text
      }
    });
    this.store.dispatch(event);
  }

  ngOnInit() {



    this.messageForm = new FormGroup({
      text: new FormControl(),
      id: new FormControl()
    });


    // this.message$.subscribe(m => {
    //   this.messageService.editMessageFromUi(m.model);
    // });

    this.messageForm.get('text').valueChanges.subscribe(t => {
      // TODO: WARNING QUICK AND DIRTY !!!
      console.log(t);
      const id = this.messageForm.get('id').value;
      this.messageService.editMessageFromUi({id, text: t});
    });


  }

  ngOnDestroy() {
  }

  editMsg(model: MessageStateServerModel) {
    // this.messageService.editMessage(model);
  }

}
