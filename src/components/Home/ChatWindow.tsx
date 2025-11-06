/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Send } from "lucide-react";
import { useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";

import { demoMessages } from "../../../data/messages";
import { useGetProfileQuery } from "../../redux/features/user/userApi";


export default function ChatWindow() {
  const { data } = useGetProfileQuery(undefined);
  const profile = data?.data
  

  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      setInputValue("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950">
      {/* Chat Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <img
          src="https://png.pngtree.com/png-vector/20240905/ourmid/pngtree-orange-haired-character-in-purple-jacket-digital-art-illustration-png-image_13759715.png"
          alt="Ankit Pathak"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="text-white font-semibold">{profile?.name}</h2>
          <p className="text-slate-400 text-sm">Online</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {demoMessages?.map((message: { id: Key | null | undefined; sender: string; text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                message.sender === "user"
                  ? "bg-blue-500 text-white rounded-bl-none"
                  : "bg-cyan-400 text-slate-900 rounded-br-none"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-slate-800 text-white placeholder-slate-500 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleSend}
            className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-2 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
