
import { Send } from "lucide-react"
import { useState } from "react"

interface Message {
    id: number
    sender: "user" | "other"
    text: string
    timestamp: string
}

const messages: Message[] = [
    {
        id: 1,
        sender: "other",
        text: "That's never been done in the history of the year. It's insulting!",
        timestamp: "2:30 PM",
    },
    {
        id: 2,
        sender: "user",
        text: "Calm down, reshad",
        timestamp: "2:31 PM",
    },
    {
        id: 3,
        sender: "other",
        text: "That's never been done in the history of the Jedi. It's insulting!",
        timestamp: "2:32 PM",
    },
    {
        id: 4,
        sender: "user",
        text: "Calm down, reshad",
        timestamp: "2:33 PM",
    },
    {
        id: 5,
        sender: "other",
        text: "That's never been done in the history of the Jedi. It's insulting!",
        timestamp: "2:34 PM",
    },
]

interface ChatWindowProps {
    selectedChat: number
}

export default function ChatWindow({ selectedChat }: ChatWindowProps) {
    const [inputValue, setInputValue] = useState("")

    const handleSend = () => {
        if (inputValue.trim()) {
            setInputValue("")
        }
    }

    return (
        <div className="flex-1 flex flex-col bg-slate-950">
            {/* Chat Header */}
            <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center gap-3">
                <img src="https://png.pngtree.com/png-vector/20240905/ourmid/pngtree-orange-haired-character-in-purple-jacket-digital-art-illustration-png-image_13759715.png" alt="Ankit Pathak" width={40} height={40} className="rounded-full" />
                <div>
                    <h2 className="text-white font-semibold">Hira Moni</h2>
                    <p className="text-slate-400 text-sm">Online</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}>
                        <div
                            className={`max-w-xs px-4 py-2 rounded-2xl ${message.sender === "user"
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
    )
}
