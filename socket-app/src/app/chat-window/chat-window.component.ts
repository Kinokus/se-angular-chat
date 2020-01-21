import { Component, OnInit } from '@angular/core';
import {ChatMessageModel} from '../actions/chat-actions';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  tempMessage: ChatMessageModel;

  constructor() {

  }

  ngOnInit() {
  }

}
