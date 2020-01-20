const {Server} = require('ws');
const {createServer} = require('http');
const uuidv5 = require('uuid/v5');

const app = require('express')();

const server = createServer(app);
const ws = new Server({server});

server.listen(4444);

let messages = {};

ws.on('connection', (socket) => {
  socket.userId = uuidv5('socket.app', uuidv5.DNS);
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

        socket.send(JSON.stringify({
          type: '[Message] Get Message From Server',
          model: {
            id: 'randomId',
            text: 'randomText'
          }
        }));

        ws.clients.forEach(client => {


          if (client.msgId === model.id && client.userId !== socket.userId) {
            client.send(JSON.stringify({
                type: 'addedMsg',
                model
              })
            )
          }
        });
        break
      }

    }

    if (type === 'message') {
    }
  });

  socket.on("addMsg", msg => {
  });


});
