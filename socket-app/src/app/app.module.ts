import {WINDOW_PROVIDERS} from './window.provider';
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, Injectable, NgModule} from '@angular/core';

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
import {GravatarPipe} from './gravatar.pipe';
import {GravatarModule} from 'ngx-gravatar';
// import chatUrl from './chat.config.json';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MessageService} from './services/message.service';


// const config: SocketIoConfig = {url: 'http://localhost:4444', options: {}};


// TODO : RECONNECT AUTOMATICALLY
// TODO : get host and port from config


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
    ChatUserStateComponent,
    GravatarPipe
  ],
  providers: [WINDOW_PROVIDERS, {
    provide: APP_INITIALIZER,
    useFactory: MessageService.initApp,
    deps: [HttpClient],
    multi: true
  }],
  imports: [
    HttpClientModule,
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
    NgxsWebsocketPluginModule.forRoot({url: MessageService.chatUrl}),
    ReactiveFormsModule,
    GravatarModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}



