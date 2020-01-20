const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const messages = {};

io.on("connection", socket => {
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("getMsg", msgId => {
    safeJoin(msgId);
    socket.emit("message", messages[msgId]);
  });

  socket.on("addMsg", msg => {
    messages[msg.id] = msg;
    safeJoin(msg.id);
    io.emit("messages", Object.keys(messages));
    socket.emit("message", msg);
  });

  socket.on("editMsg", msg => {
    messages[msg.id] = msg;
    socket.to(msg.id).emit("message", msg);
  });

  socket.on("editMsgFromUi", payload => {
    messages[payload.message.id] = payload.message;
    socket.to(payload.message.id).emit("message", messages[payload.message.id]);
  });


  io.emit("messages", Object.keys(messages));

});

http.listen(4444);
