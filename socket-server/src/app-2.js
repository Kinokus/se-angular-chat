const {Server} = require('ws');
const {createServer} = require('http');
const uuid = require('uuid-random');


const app = require('express')();

const server = createServer(app);
const ws = new Server({server});

server.listen(4444);

let messages = {'init id': {id: 'init id', text: 'init text'}};

ws.on('connection', (socket) => {
  socket.userId = uuid();
  socket.send(JSON.stringify({type: '[Message List] Get Messages From Server', payload: Object.keys(messages)}));
  socket.on('message', data => {
    // That's the object that we passed into `SendWebSocketMessage` constructor

    const {type, model} = JSON.parse(data);
    // messages[msg.id] = msg;
    // safeJoin(msg.id);
    // ws.emit("messages", Object.keys(messages));
    // socket.emit("message", msg);

    switch (type) {
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
            console.log(client.userId, socket.userId);
            if (client.msgId === socket.msgId) {
              console.log(client.msgId, socket.msgId);
              client.send(JSON.stringify({type: '[Message] Get Message From Server', model: messages[model.id]}));
            }
          }
        });
        break
      }

      case 'getMessages': {
        // socket.broadcast(JSON.stringify(Object.keys(messages)));
        break;
      }

    }

  });


});
