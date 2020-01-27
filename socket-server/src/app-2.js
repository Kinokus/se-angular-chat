const {Server} = require('ws');
const {createServer} = require('http');
const uuid = require('uuid-random');
const app = require('express')();
const server = createServer(app);
const ws = new Server({server});
const getUuid = require('uuid-by-string');
const QRCode = require('qrcode')


server.listen(4444);
let messages = {'init id': {id: 'init id', text: 'init text'}};
ws.on('connection', async (socket) => {
  socket.userId = uuid();

  const userModel = {
    id: socket.userId,
    // qrImage: await QRCode.toDataURL(socket.userId),
    username: "%username%"
  }

  // TODO : LEGACY
  socket.send(JSON.stringify({type: '[Message List] Get Messages From Server', payload: Object.keys(messages)}));

  socket.send(
    JSON.stringify({
      type: '[Chat] New Message',
      payload: {
        text: `Your new Id is ${socket.userId.split('-')[1]}`,
        id: getUuid(`${new Date().getTime().toString()}_${socket.userId}_join_Us`),
        senderId: socket.userId
      }
    }));

  socket.send(
    JSON.stringify({
      type: '[Chat] New Connection',
      payload: {
        model: userModel
      }
    }));


  ws.clients.forEach(async client => {
    client.send(
      JSON.stringify({
        type: '[Chat] New User',
        payload: {
          model: userModel
        }
      }));

    if (client.userId !== socket.userId) {
      client.send(
        JSON.stringify({
          type: '[Chat] New Message',
          payload: {
            text: `${socket.userId.split('-')[1]} join Us`,
            id: getUuid(`${new Date().getTime().toString()}_${socket.userId}_join_Us`),
            senderId: socket.userId
          }
        }));

      client.send(
        JSON.stringify({
          type: '[Chat] Request Messages',
          payload: {}
        }));

      client.send(
        JSON.stringify({
          type: '[Chat] Request Users',
          payload: {}
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
      case 'chatSendMessages': {
        //TODO filter maintenance messages !

        ws.clients.forEach(client => {
          if (client.userId !== socket.userId) {
            client.send(
              JSON.stringify({
                type: '[Chat] Get Messages',
                payload: {messages: model.messages}
              }));
          }
        });


        break
      }
      case 'chatUserChangeName': {
        //TODO filter maintenance messages !

        console.log(model, socket.userId);

        ws.clients.forEach(client => {
          // if (client.userId !== socket.userId) {
          client.send(
            JSON.stringify({
              type: '[Chat] User Change Name',
              payload: {model: {id: socket.userId, username: model.username}}
            }));
          // }
        });
        break
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

