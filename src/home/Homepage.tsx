
import { useState } from "react"
import ChatSidebar from "./_components/ChatSidebar"
import ChatWindow from "./_components/ChatWindow"

export default function Homepage() {
  const [selectedChat, setSelectedChat] = useState(0)

  return (
    <div className="flex h-screen bg-slate-950">
      <ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  )
}
