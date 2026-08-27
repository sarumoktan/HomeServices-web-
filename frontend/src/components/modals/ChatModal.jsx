import React, { useState, useEffect, useRef } from "react";
import { Overlay } from "../Overlay";
import { Avatar } from "../Avatar";
import { X, Send } from "lucide-react"; // Make sure to import icons

export function ChatModal({ onClose }) {
  const [msgs, setMsgs] = useState([
    { id: 1, from: "p", text: "Hello! I'll be at your location by 10:15 AM.", time: "9:45 AM" },
    { id: 2, from: "u", text: "Great! Please bring the pipe fittings too.", time: "9:47 AM" },
    { id: 3, from: "p", text: "Sure, I have everything. See you soon! 👍", time: "9:48 AM" },
  ]);
  const [inp2, setInp2] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = () => {
    if (!inp2.trim()) return;
    setMsgs([
      ...msgs,
      {
        id: msgs.length + 1,
        from: "u",
        text: inp2,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInp2("");
  };

  return (
    <Overlay>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] flex flex-col h-[500px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2E4CDB] to-[#233EC2] px-5 py-3.5 flex items-center gap-3">
          <Avatar initials="RK" gradient="orange" size={38} />
          <div className="flex-1">
            <div className="font-bold text-white text-sm">Rajesh Kumar</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-white/80 text-[11px] font-medium">
                On the way · 8 min
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#F7F6F2]">
          {msgs.map((m) => (
            <div
              key={m.id}
              className={`flex mb-3 ${m.from === "u" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] px-3.5 py-2.5 ${
                  m.from === "u"
                    ? "bg-[#2E4CDB] text-white rounded-2xl rounded-br-sm shadow-sm"
                    : "bg-white text-[#17181A] border border-black/5 rounded-2xl rounded-bl-sm shadow-sm"
                }`}
              >
                <div className="text-[13px] leading-relaxed">{m.text}</div>
                <div
                  className={`text-[10px] mt-1 font-medium ${
                    m.from === "u" ? "text-white/60 text-right" : "text-[#17181A]/40 text-left"
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={ref} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-black/5 flex gap-2 items-center">
          <input
            value={inp2}
            onChange={(e) => setInp2(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 bg-[#F7F6F2] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[#17181A] outline-none focus:border-[#2E4CDB] transition-colors"
          />
          <button
            onClick={send}
            disabled={!inp2.trim()}
            className="bg-[#2E4CDB] hover:bg-[#233EC2] disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 -ml-0.5" />
          </button>
        </div>
        
      </div>
    </Overlay>
  );
}