
import { useState } from "react"
import ChatSidebar from "../components/Home/ChatSidebar"
import ChatWindow from "../components/Home/ChatWindow"


const HomePage = () => {
    const [selectedChat, setSelectedChat] = useState(0)
    return (
        <div className="flex h-screen bg-slate-950">
            <ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
            <ChatWindow selectedChat={selectedChat} />
        </div>
    );
};

export default HomePage;