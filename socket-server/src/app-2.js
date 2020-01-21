const {Server} = require('ws');
const {createServer} = require('http');
const uuid = require('uuid-random');
const app = require('express')();
const server = createServer(app);
const ws = new Server({server});
const getUuid = require('uuid-by-string');

server.listen(4444);
let messages = {'init id': {id: 'init id', text: 'init text'}};
ws.on('connection', (socket) => {
  socket.userId = uuid();

  // TODO : LEGACY
  socket.send(JSON.stringify({type: '[Message List] Get Messages From Server', payload: Object.keys(messages)}));


  socket.send(
    JSON.stringify({
      type: '[Chat] New Message',
      payload: {text: `Your new Id is ${socket.userId}`, id: 'id', senderId: socket.userId}
    }));

  socket.send(
    JSON.stringify({
      type: '[Chat] New Connection',
      payload: {model: {id: socket.userId}}
    }));

  ws.clients.forEach(client => {
    if (client.userId !== socket.userId) {
      client.send(
        JSON.stringify({
          type: '[Chat] New Message',
          payload: {text: `${socket.userId} join Us`, id: '', senderId: socket.userId}
        }));
    }
  });


  socket.on('message', data => {
    // That's the object that we passed into `SendWebSocketMessage` constructor

    const {type, model} = JSON.parse(data);
    switch (type) {

      case 'chatSendMessage': {
        ws.clients.forEach(client => {
          client.send(
            JSON.stringify({
              type: '[Chat] New Message',
              payload: {
                text: model.text,
                id: getUuid(`${new Date().getTime().toString()}_${socket.userId}_${model.text}`),
                senderId: socket.userId
              }
            }));
        });
        break;
      }


      // todo: legacy
      case 'message': {
        break
      }
      case 'addMsg': {
        messages[model.id] = model;
        socket.msgId = model.id;
        ws.clients.forEach(client => {
          client.send(JSON.stringify({
            type: '[Message List] Get Messages From Server',
            payload: Object.keys(messages)
          }));
        });
        socket.send(JSON.stringify({type: '[Message] Get Message From Server', model: messages[model.id]}));
        break
      }
      case 'getMsg': {
        socket.msgId = model.id;
        socket.send(JSON.stringify({type: '[Message] Get Message From Server', model: messages[model.id]}));
        break
      }
      case 'editMsgFromUi': {
        messages[model.id] = model;
        ws.clients.forEach(client => {
          if (client.userId !== socket.userId) {
            if (client.msgId === socket.msgId) {
              client.send(JSON.stringify({type: '[Message] Get Message From Server', model: messages[model.id]}));
            }
          }
        });
        break
      }
      case 'getMessages': {
        break;
      }

    }

  });
});

