const express = require("express");
const http = require("http");
const cors = require("cors");
// const socketio = require("socket.io");

const { Server } = require("socket.io");

const router = require("./router");

//app实例对象
const app = express();
//app 部署的server
const server = http.createServer(app);
// const io = socketio(server);

app.use(cors());
app.use(router);

//把express上的server作为参数传到socket.io的Server class中, config cors for the FE server
const io = new Server(server, {
  cors: {
    origin: [/localhost:3000$/, /renju\.web\.cloudendpoint\.cn$/],
    // origin: /localhost:3000$/,
    methods: ["GET", "POST"],
  },
});

const userList = {};
const userId = {};
//when other connect the server, the callback function would be called
io.on("connection", (socket) => {
  console.log(`User enter with socket id : ${socket.id}`);

  //connect后的信息交互逻辑要写在connection里面
  socket.on("join_room", (data) => {
    userId[socket.id] = [data.user, data.room];
    //标记当前客户端所在的房间号！！！
    if (userList[data.room] !== undefined) {
      userList[data.room].count++;
      userList[data.room].users.push(data.user);
    } else {
      userList[data.room] = {
        count: 1,
        users: [data.user],
      };
    }

    // socket.emit("getUserList", userList);

    if (userList[data.room].count > 2) {
      socket.emit("full", true);
      userList[data.room].users.pop();
      userList[data.room].count--;
      return;
    }

    socket.join(data.room);
    console.log("success!!");
    console.log(`${data.user} is login in Room ${data.room}`);
    console.log(`userList:${JSON.stringify(userList)}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    //to()的参数根据join的参数决定发送给哪个room
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("set_chess", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receive_chess", data);
  });

  socket.on("retrieve_chess", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receive_chess", data);
  });

  socket.on("win_chess", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_chess", data);
  });

  socket.on("leave", (data) => {
    console.log(data);
    const idx = userList[data.room].users.indexOf(data.username);
    userList[data.room].users.splice(idx, 1);
    userList[data.room].count--;
    if (userList[data.room].count === 0) {
      userList[data.room] = undefined;
    }
    console.log(userList);
  });

  socket.on("disconnect", (data) => {
    console.log(userId[socket.id]);
    if (userId[socket.id]) {
      let user = userId[socket.id][0];
      let room = userId[socket.id][1];
      const idx = userList[room].users.indexOf(user);
      userList[room].users.splice(idx, 1);
      userList[room].count--;
      console.log(userList);
      console.log(userId);
    }
    console.log(`User disconnected socket id : ${socket.id}`);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("server is running....");
});
