
import { useState } from "react"
import ChatSidebar from "../components/Home/ChatSidebar"
import ChatWindow from "../components/Home/ChatWindow"


const HomePage = () => {
    const [selectedConversation, setSelectedConversation] = useState<number>(0);
    return (
        <div className="flex h-screen bg-slate-950">
            <ChatSidebar 
                onSelectConversation={(id: number) => setSelectedConversation(id)} 
                selectedConversation={selectedConversation} 
            />

            <ChatWindow 
                conversationId={selectedConversation}
            />
        </div>
    );
};

export default HomePage;