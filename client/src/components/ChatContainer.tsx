import { useAuth } from "@/store/useAuthStore";
import { useChat } from "@/store/useChatStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";

const ChatContainer = () => {
  const { selectedUser, isMessagesLoading, messages, getMessagesByUserId } =
    useChat();
  const { authUser } = useAuth();

  useEffect(() => {
    if (selectedUser?.id === undefined) {
      return;
    }
    getMessagesByUserId(selectedUser?.id);
  }, [selectedUser, getMessagesByUserId]);

  return (
    <div className="flex-1 flex flex-col h-full bg-base-100/50">
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="flex-1 w-full max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat ${
                  msg.senderId === authUser?.id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser?.id
                      ? "bg-primary text-primary-content rounded-l-lg rounded-tr-md"
                      : "bg-base-300 text-base-content rounded-tl-md rounded-r-lg"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toISOString().slice(11, 16)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser?.name!} />
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
