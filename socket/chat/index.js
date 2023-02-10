const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 채팅방에 입장한 사람들의 목록
// {소켓아이디1: 닉네임1, 소켓아이디2: 닉네임2, ...}
let list = {};

io.on("connection", (socket) => {
  console.log("Server Socket Connected");

  socket.emit("id", socket.id);

  socket.on("username", (name) => {
    list[socket.id] = name;
    // 입장 안내 메세지
    //   io.emit("notice", socket.id + "님이 입장하였습니다.");
    io.emit("notice", list[socket.id] + "님이 입장하였습니다.");
    // 현재 채팅방 목록 보내주기
    io.emit("list", list);
  });

  socket.on("send", (data) => {
    // data = {msg : ~~~, to : ~~~}
    data["id"] = socket.id;
    // data = {msg : ~~~, to : ~~~, id : ~~~}
    data["username"] = list[socket.id];
    // data = {msg : ~~~, to : ~~~, id : ~~~, username : ~~~}
    data["is_dm"] = false;
    // data = {msg : ~~~, to : ~~~, id : ~~~, username : ~~~, is_dm : ~~~}
    if (data.to === "전체") io.emit("newMSG", data);
    else {
      data["is_dm"] = true;
      const socketID = Object.keys(list).find((key) => list[key] == data.to);
      io.to(socketID).emit("newMSG", data);
      socket.emit("newMSG", data);
    }
  });

  socket.on("disconnect", () => {
    io.emit("notice", list[socket.id] + "님이 퇴장했습니다.");
    delete list[socket.id];
    io.emit("list", list);
  });
});

http.listen(8000, () => {
  console.log("Server port : ", 8000);
});
