import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import createSocketConnection from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          text,
        };
      });

      setMessages(chatMessages);
    } catch (err) {
      if (err.response.status === 403) {
        setError(err.message);
      }
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      // console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  if (!user) return;

  return error ? (
    <div className="card bg-base-100 w-96 shadow-2xl block mx-auto mt-20 mb-70">
      <div className="card-body">
        <h2 className="card-title">Not connected with the user!</h2>
        <p>{error}</p>
      </div>
    </div>
  ) : (
    <div className="h-[80vh] m-5 flex flex-col border border-info rounded-2xl">
      <div className="h-16 my-3 mx-5 rounded-2xl border-b bg-info text-base-100 flex justify-center items-center px-4">
        <p className="text-bold text-2xl">Chat</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="chat chat-start">
            <div className="chat-header">{msg.firstName}</div>
            <div className="chat-bubble bg-accent">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 my-3 mx-5 ">
        <input
          className="border border-neutral rounded-full w-full p-2.5 focus:outline-info"
          type="text"
          placeholder="Type text and send to chat"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></input>
        <button className="btn btn-info p-5" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
