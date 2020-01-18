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

    socket.on("getMessage", msgId => {
        safeJoin(msgId);
        socket.emit("message", messages[msgId]);
    });

    socket.on("addMessage", msg => {
        messages[msg.id] = msg;
        safeJoin(msg.id);
        io.emit("messages", Object.keys(messages));
        socket.emit("message", msg);
    });

    socket.on("editMessage", msg => {
        messages[msg.id] = msg;
        socket.to(msg.id).emit("message", msg);
    });

    io.emit("messages", Object.keys(messages));
});

http.listen(4444);
