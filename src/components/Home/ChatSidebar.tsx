/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { LogOutIcon, SearchCheck } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import { useGetAllUsersQuery } from "../../redux/features/user/userApi";
const defaultProfilePic = "https://png.pngtree.com/png-clipart/20250417/original/pngtree-digital-illustration-of-a-man-in-orange-outfit-and-glasses-with-png-image_20715987.png";

// interface Chat {
//   id: number;
//   name: string;
//   email: string;
//   profilePic: string;
//   status: "online" | "offline";
// }

// const chats: Chat[] = [
//   {
//     id: 1,
//     name: "Rashed uzzaman reshad",
//     email: "rasheduzzamanreshad@gmail.com",
//     profilePic:
//       "https://png.pngtree.com/png-clipart/20250417/original/pngtree-digital-illustration-of-a-man-in-orange-outfit-and-glasses-with-png-image_20715987.png",
//     status: "online",
//   },
//   {
//     id: 2,
//     name: "Rashed uzzaman reshad",
//     email: "rasheduzzamanreshad@gmail.com",
//     profilePic:
//       "https://png.pngtree.com/png-clipart/20250417/original/pngtree-digital-illustration-of-a-man-in-orange-outfit-and-glasses-with-png-image_20715987.png",
//     status: "offline",
//   },
//   {
//     id: 3,
//     name: "Rashed uzzaman reshad",
//     email: "rasheduzzamanreshad@gmail.com",
//     profilePic:
//       "https://png.pngtree.com/png-clipart/20250417/original/pngtree-digital-illustration-of-a-man-in-orange-outfit-and-glasses-with-png-image_20715987.png",
//     status: "offline",
//   },
//   {
//     id: 4,
//     name: "Rashed uzzaman reshad",
//     email: "rasheduzzamanreshad@gmail.com",
//     profilePic:
//       "https://png.pngtree.com/png-clipart/20250417/original/pngtree-digital-illustration-of-a-man-in-orange-outfit-and-glasses-with-png-image_20715987.png",
//     status: "offline",
//   },
// ];

interface ChatSidebarProps {
  selectedChat: number;
  onSelectChat: (id: number) => void;
}

export default function ChatSidebar({
  selectedChat,
  onSelectChat,
}: ChatSidebarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useGetAllUsersQuery(undefined);
  const chats = data?.data;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats?.filter(
    (chat:any) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogOut = () => {
    dispatch(logOut());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white mb-4">Chats</h1>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <SearchCheck className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats?.map((chat:any) => (
          <button
            key={chat._id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full px-4 py-3 flex items-center gap-3 border-b border-slate-800 transition-colors ${
              selectedChat === chat.id
                ? "bg-slate-800"
                : "hover:bg-slate-800/50"
            }`}
          >
            <div className="relative shrink-0">
              <img
                src={chat.profilePic || defaultProfilePic}
                alt={chat.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              {chat.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-white font-medium text-sm">{chat.name}</p>
              <p className="text-slate-400 text-xs truncate">{chat.email}</p>
            </div>
          </button>
        ))}
      </div>

      {/* logout button */}
      <div className="p-4 border-t border-slate-800">
        <button
          type="button"
          onClick={handleLogOut}
          className="w-full cursor-pointer text-left text-sm text-gray-400 hover:text-white"
        >
          Logout
          <LogOutIcon className="inline-block ml-1" />
        </button>
      </div>
    </div>
  );
}
