import {Component, OnInit} from '@angular/core';
import {ConnectWebSocket} from '@ngxs/websocket-plugin';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private  store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ConnectWebSocket());
  }

}
