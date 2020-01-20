import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MessageListComponent} from './message-list/message-list.component';
import {MessageComponent} from './message/message.component';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {MessageListState, MessageState} from './states/state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {NgxsWebsocketPluginModule} from '@ngxs/websocket-plugin';
import {customDeserializer} from './services/message.service';


// const config: SocketIoConfig = {url: 'http://localhost:4444', options: {}};
const config = {
  url: 'ws://localhost:4444',
  deserializer: customDeserializer
};


@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // SocketIoModule.forRoot(config),
    NgxsModule.forRoot([MessageState, MessageListState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsWebsocketPluginModule.forRoot(config),
    ReactiveFormsModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
