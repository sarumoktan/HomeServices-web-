import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ChatModal({ provider, currentUser, authToken, onClose }) {
  if (!provider || !currentUser) {
    return null;
  }

  const providerName = provider?.name || "Service Provider";

  const providerService =
    provider?.service || provider?.category || "Home Service";

  const providerImage =
    provider?.image ||
    provider?.imageUrl ||
    provider?.profileImage ||
    provider?.photo ||
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80";

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [connected, setConnected] = useState(false);
  const [providerOnline, setProviderOnline] = useState(false);
  const [peerTyping, setPeerTyping] = useState(false);

  const socketRef = useRef(null);
  const roomIdRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      auth: { token: authToken },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      socket.emit(
        "join_room",
        { userId: currentUser.id, peerId: provider.id },
        ({ roomId, history }) => {
          roomIdRef.current = roomId;
          setMessages(
            (history || []).map((m) => ({
              id: m.id,
              sender: m.senderId === currentUser.id ? "user" : "provider",
              text: m.text,
              time: new Date(m.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }))
          );
        }
      );
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("new_message", (m) => {
      if (m.roomId !== roomIdRef.current) return;
      setMessages((prev) => [
        ...prev,
        {
          id: m.id,
          sender: m.senderId === currentUser.id ? "user" : "provider",
          text: m.text,
          time: new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    socket.on("peer_typing", ({ senderId, isTyping }) => {
      if (senderId === provider.id) setPeerTyping(isTyping);
    });

    return () => socket.disconnect();
  }, [currentUser.id, provider.id, authToken]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();

    const text = inputText.trim();
    if (!text || !socketRef.current || !roomIdRef.current) return;

    socketRef.current.emit("send_message", {
      roomId: roomIdRef.current,
      senderId: currentUser.id,
      senderRole: currentUser.role,
      text,
    });

    setInputText("");

    socketRef.current.emit("typing", {
      roomId: roomIdRef.current,
      senderId: currentUser.id,
      isTyping: false,
    });
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (!socketRef.current || !roomIdRef.current) return;

    socketRef.current.emit("typing", {
      roomId: roomIdRef.current,
      senderId: currentUser.id,
      isTyping: true,
    });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("typing", {
        roomId: roomIdRef.current,
        senderId: currentUser.id,
        isTyping: false,
      });
    }, 1500);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
      onMouseDown={handleBackdropClick}
    >
      <div
        className="
          flex
          h-[600px]
          w-full
          max-w-[430px]
          flex-col
          overflow-hidden
          rounded-[24px]
          bg-white
          shadow-[0_25px_80px_rgba(0,0,0,0.25)]
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={providerImage}
                alt={providerName}
                className="
                  h-11
                  w-11
                  rounded-full
                  object-cover
                  border
                  border-gray-200
                "
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80";
                }}
              />

              <span
                className={`
                  absolute
                  bottom-0
                  right-0
                  h-3
                  w-3
                  rounded-full
                  border-2
                  border-white
                  ${providerOnline ? "bg-emerald-500" : "bg-gray-300"}
                `}
              />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">{providerName}</h3>

              <p className="text-xs text-gray-500">{providerService}</p>

              <div className="mt-0.5 flex items-center gap-1">
                <span
                  className={`h-2 w-2 rounded-full ${
                    connected ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                />

                <span className="text-xs font-medium text-emerald-600">
                  {!connected
                    ? "Connecting…"
                    : peerTyping
                    ? "Typing…"
                    : "Connected"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-2xl
              text-gray-400
              hover:bg-gray-100
              hover:text-gray-700
              transition
            "
          >
            ×
          </button>
        </div>

        <div className="bg-[#F7FDFC] px-5 py-3 text-center">
          <p className="text-xs text-gray-500">
            You are chatting with{" "}
            <span className="font-semibold text-gray-700">
              {providerName}
            </span>
          </p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-[#F7F8F8] p-5">
          {messages.map((message) => {
            const isUser = message.sender === "user";

            return (
              <div
                key={message.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[78%]
                    rounded-[18px]
                    px-4
                    py-3
                    text-sm
                    leading-relaxed
                    ${
                      isUser
                        ? "rounded-br-[5px] bg-[#009F72] text-white"
                        : "rounded-bl-[5px] border border-gray-200 bg-white text-gray-800 shadow-sm"
                    }
                  `}
                >
                  <p>{message.text}</p>

                  <div
                    className={`
                      mt-1
                      text-[10px]
                      ${isUser ? "text-white/70" : "text-gray-400"}
                    `}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="
            flex
            gap-2
            border-t
            border-gray-100
            bg-white
            p-4
          "
        >
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder={`Message ${providerName}...`}
            className="
              min-w-0
              flex-1
              rounded-[14px]
              border
              border-gray-200
              bg-gray-50
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-[#009F72]
              focus:bg-white
              focus:ring-2
              focus:ring-[#009F72]/10
            "
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="
              rounded-[14px]
              bg-[#009F72]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#008B64]
              disabled:cursor-not-allowed
              disabled:bg-gray-300
            "
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}