// frontend/src/components/modals/ChatModal.jsx
import React, { useState, useEffect } from "react";
import { X, Send } from "lucide-react";

export function ChatModal({ jobId, receiverId, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!isOpen || !jobId) return;
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/chat/${jobId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setMessages(data.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    fetchMessages();
  }, [isOpen, jobId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobId, receiver: receiverId, message: newMessage })
      });
      const data = await res.json();
      if (data.success) {
        setMessages([...messages, data.data]);
        setNewMessage("");
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg flex flex-col h-[500px] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-[#F7F6F2]">
          <h3 className="font-bold text-[#17181A]">Job Chat</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 bg-white rounded-lg shadow-sm max-w-[75%]">
              <p className="text-sm text-[#17181A]">{msg.message}</p>
              <span className="text-[10px] text-gray-400">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2">
          <input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2E4CDB]"
          />
          <button type="submit" className="bg-[#2E4CDB] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#233EC2]">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
