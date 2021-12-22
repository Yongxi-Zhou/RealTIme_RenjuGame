import Game from "./Game";
import io from "socket.io-client";
import React, { useState, useRef } from "react";
import { UserContext } from "./UserContect";

const socket = io("https://tic-socket.herokuapp.com/");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", {
        user: username,
        room: room,
      });
      socket.on("full", (data) => {
        if (data) {
          setIsLogin(false);
          alert("the room is full");
          return;
        }
      });

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
          <Game socket={socket} username={username} room={room} />
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
