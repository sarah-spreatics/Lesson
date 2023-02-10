const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/practice42.html");
});

io.on("connection", (socket) => {
  console.log("Server Socket Connected");

  socket.on("hello_e", (msg) => {
    console.log("hello 버튼", msg);
    socket.emit("response", "res : " + msg);
  });

  socket.on("study_e", (msg) => {
    console.log("study 버튼", msg);
    socket.emit("response", "res : " + msg);
  });

  socket.on("bye_e", (msg) => {
    console.log("bye 버튼", msg);
    socket.emit("response", "res : " + msg);
  });

  let msg = {
    hello: "안녕하세요!",
    study: "공부합시다!",
    bye: "안녕히가세요!",
  };

  socket.on("send", (data) => {
    console.log("client", data);
    socket.emit("response", data + " : " + msg[data]);
  });

  socket.on("disconnect", () => {
    console.log("Server Socket disconnected");
  });
});

http.listen(8000, () => {
  console.log("Server port : ", 8000);
});
