import {Component, OnInit, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {debounceTime, startWith} from 'rxjs/operators';
import {Message} from '../models/message';
import {MessageService} from '../services/message.service';
import {MessageState, MessageStateModel} from '../states/state';
import {Select, Store} from '@ngxs/store';
import {ConnectToMessages} from '../actions/actions';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  @Select(MessageState) message$: BehaviorSubject<MessageStateModel>;
  messageForm: FormGroup;

  constructor(private messageService: MessageService, private store: Store) {
  }

  ngOnInit() {
    this.messageForm = new FormGroup({
      text: new FormControl(),
      id: new FormControl()
    });

    this.message$.subscribe(m => {
      // TODO: WARNING QUICK AND DIRTY !!!
      console.log(m);
      this.messageForm.setValue(m);
    });

    this.messageForm.valueChanges.pipe(debounceTime(500)).subscribe(v => {
      // TODO: WARNING QUICK AND DIRTY !!!
      console.log(v);
      this.messageService.editMessage(v);
    });


  }

  ngOnDestroy() {
  }

  editMsg() {
    this.messageService.editMessage(this.message$.value);
  }

}
