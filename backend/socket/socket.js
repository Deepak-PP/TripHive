const socketIO = require("socket.io");

function initializeSocket(server) {
  const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:4200",
    },
  });

  io.on("connection", (socket) => {
    socket.on("setup", (id) => {
      socket.join(id);
      socket.emit("connected");
      console.log("A user connected");
    });

    socket.on("join", (room) => {
      socket.join(room);
    });

    socket.on("chatMessage", (message) => {
      console.log(message, "message");
      socket.in(message.to).emit("newmessage", message);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}



module.exports = initializeSocket

