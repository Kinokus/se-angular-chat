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

import {LegacyComponent} from './legacy/legacy.component';
import {RouterModule} from '@angular/router';
import {ChatWindowComponent} from './chat-window/chat-window.component';
import {ChatMessageWindowComponent} from './chat-message-window/chat-message-window.component';
import {ChatUsersWindowComponent} from './chat-users-window/chat-users-window.component';
import {ChatMessageInputComponent} from './chat-message-input/chat-message-input.component';
import {ChatState, ChatUsersState, ChatUserState} from './states/chat-state';
import {ChatUserStateComponent} from './chat-user-state/chat-user-state.component';


// const config: SocketIoConfig = {url: 'http://localhost:4444', options: {}};
const config = {
  url: 'ws://localhost:4444'
};


@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageComponent,
    LegacyComponent,
    ChatWindowComponent,
    ChatMessageWindowComponent,
    ChatUsersWindowComponent,
    ChatMessageInputComponent,
    ChatUserStateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'legacy', component: LegacyComponent},
      {path: '', component: ChatWindowComponent},
    ]),
    FormsModule,
    // SocketIoModule.forRoot(config),
    NgxsModule.forRoot([MessageState, MessageListState, ChatState, ChatUserState, ChatUsersState]),
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
