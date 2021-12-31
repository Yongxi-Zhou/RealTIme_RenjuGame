import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [curMessage, setCurMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  //要用异步！！
  const sendMessage = async () => {
    if (curMessage !== "") {
      const messageData = {
        name: username,
        room: room,
        message: curMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurMessage("");
    }
  };

  const sendEnter = async (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chess Room</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((item, idx) => {
            return (
              <div
                className="message"
                key={idx}
                id={username === item.name ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{item.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{item.time}</p>
                    <p id="author">{item.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(e) => {
            setCurMessage(e.target.value);
          }}
          onKeyUp={sendEnter}
          value={curMessage}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
