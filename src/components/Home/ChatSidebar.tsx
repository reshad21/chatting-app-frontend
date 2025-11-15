/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import { LogOutIcon, SearchCheck } from "lucide-react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

import {
  useCreateConversationMutation,
  useGetMyConversationsQuery,
} from "../../redux/features/conversation/conversationApi";

import { useGetAllUsersQuery } from "../../redux/features/user/userApi";

const defaultProfilePic =
  "https://png.pngtree.com/png-clipart/20250417/original/pngtree-digital-illustration-of-a-man-in-orange-outfit-and-glasses-with-png-image_20715987.png";

export default function ChatSidebar({
  selectedConversation,
  onSelectConversation,
}: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  // 👉 Logged-In User
  const { user } = useAppSelector((state) => state.auth);
  const loggedInUserId = user?.userId;

  // 👉 API calls
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { data: convData } = useGetMyConversationsQuery(undefined);
  const [createConversation] = useCreateConversationMutation();

  const allUsers = usersData?.data || [];
  const conversations = convData?.data || [];

  // 👉 Filter Users (Search)
  const filteredUsers = allUsers.filter((u: any) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // -------- CREATE/OPEN CONVERSATION ----------
  const handleSelectChat = async (user: any) => {
    // check existing conversation
    const existingConv = conversations.find((c: any) =>
      c.participants.some((p: any) => p._id === user._id)
    );

    if (existingConv) {
      onSelectConversation(existingConv._id);
    } else {
      const res = await createConversation({ receiverId: user._id }).unwrap();
      onSelectConversation(res.data._id);
    }
  };

  // -------- LOGOUT ----------
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

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 text-white rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none"
          />
          <SearchCheck className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* ---------------------- Conversations ---------------------- */}
      <p className="text-slate-400 px-4 pt-4 text-xs">Recent Chats</p>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv: any) => {
          // 👉 Find the other user
          const otherUser = conv.participants.find(
            (p: any) => p._id !== loggedInUserId
          );

          if (!otherUser) return null;

          return (
            <button
              key={conv._id}
              onClick={() => onSelectConversation(conv._id)}
              className={`w-full px-4 py-3 flex items-center gap-3 border-b border-slate-800 ${
                selectedConversation === conv._id
                  ? "bg-slate-800"
                  : "hover:bg-slate-800/50"
              }`}
            >
              <img
                src={otherUser.profilePic || defaultProfilePic}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1 text-left">
                <p className="text-white text-sm">{otherUser.name}</p>
                <p className="text-slate-400 text-xs truncate">
                  {otherUser.email}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ---------------------- All Users ---------------------- */}
      <p className="text-slate-400 px-4 pt-4 text-xs">All Users</p>

      <div className="overflow-y-auto max-h-60 border-t border-slate-800">
        {filteredUsers.map((user: any) => (
          <button
            key={user._id}
            onClick={() => handleSelectChat(user)}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-800/50"
          >
            <img
              src={user.profilePic || defaultProfilePic}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1 text-left">
              <p className="text-white text-sm">{user.name}</p>
              <p className="text-slate-400 text-xs">{user.email}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          type="button"
          onClick={handleLogOut}
          className="w-full text-left text-sm text-gray-400 hover:text-white"
        >
          Logout <LogOutIcon className="inline-block ml-1" />
        </button>
      </div>
    </div>
  );
}
