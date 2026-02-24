"use client";
import ActiveTabSwitch from "@/components/ActiveTabSwitch";
import ChatContainer from "@/components/ChatContainer";
import ChatList from "@/components/ChatList";
import ContactList from "@/components/ContactList";
import NoConversationPlaceholder from "@/components/NoConversationPlaceholder";
import ProfileHeader from "@/components/ProfileHeader";
import { GlowEffect } from "@/components/ui/glow-effect";
import { useAuth } from "@/store/useAuthStore";
import { useChat } from "@/store/useChatStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChatPage = () => {
  const { verifyUser, isVerifyingUser, authUser } = useAuth();
  const router = useRouter();
  const { activeTab, selectedUser } = useChat();

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isVerifyingUser && !authUser) {
      router.replace("/login");
    }
  }, [authUser, isVerifyingUser, router]);

  if (isVerifyingUser) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-2 sm:p-4 text-base-content">
      {/* Card Wrapper */}
      <div className="relative flex items-center justify-center w-full max-w-6xl h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] lg:h-[calc(100vh-4rem)]">
        <GlowEffect duration={10} mode="colorShift" className="z-20" />

        {/* Card Content */}
        <div className="z-30 flex w-full h-full rounded-2xl bg-base-200 overflow-hidden">
          {/* Sidebar: Contacts / Chats list */}
          <div
            className={`
              flex flex-col w-full md:w-2/5 lg:w-1/3
              border-r border-base-300 pt-4 bg-base-300
              ${selectedUser ? "hidden md:flex" : "flex"}
            `}
          >
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
              {activeTab === "chat" ? <ChatList /> : <ContactList />}
            </div>
          </div>

          {/* Main Area: Chat conversation or placeholder */}
          <div
            className={`
              relative flex flex-1 flex-col rounded-r-2xl p-4 bg-base-100
              ${selectedUser ? "flex" : "hidden md:flex"}
            `}
          >
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
