import Game from "./components/Game";
import Chat from "./components/Chat";
import io from "socket.io-client";
import React, { useState, useRef } from "react";
import { UserContext } from "./util/UserContect";
import "./App.css";

const DEV_SOCKET = "http://localhost:5000/";
const PORD_SOCKET = "https://tic-socket.herokuapp.com/";
const socket = io(DEV_SOCKET);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", {
        user: username,
        room: room,
      });
      // socket.on("getUserList", (data) => {
      //   userList.current = data;
      //   console.log(userList.current);
      // });

      socket.on("full", (data) => {
        if (data) {
          setIsFull(true);
          // setIsLogin(false);
          // alert("the room is full");
          // return;
        }
      });

      // console.log(userList.current);
      // if (userList.current.length > 2) {
      //   alert("the room is full");
      //   return;
      // }

      setIsLogin(true);
    }
  };
  const confirmEnter = (e) => {
    if (e.keyCode === 13) {
      joinRoom();
    }
  };
  return (
    <div className="App">
      <UserContext.Provider value={[isLogin, setIsLogin]}>
        {!isLogin ? (
          <div className="joinChatContainer">
            <h3>Join a Chess</h3>
            <input
              type="text"
              placeholder="John"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              onKeyUp={confirmEnter}
            />
            {/* Join a room */}
            <button onClick={joinRoom}>Join a room</button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Game
              socket={socket}
              username={username}
              room={room}
              full={isFull}
            />
            <Chat socket={socket} username={username} room={room} />
          </div>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
