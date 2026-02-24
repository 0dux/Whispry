import { useChat } from "@/store/useChatStore";
import { User } from "lucide-react";
import { useEffect } from "react";
import NoChatsFound from "./NoChatsFound";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

const ChatList = () => {
  const { getChatPartners, allChats, isUserLoading, setSelectedUser } =
    useChat();

  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);

  if (isUserLoading) {
    return <UserLoadingSkeleton />;
  }

  if (allChats.length === 0) {
    return <NoChatsFound />;
  }

  return (
    <div className="space-y-2">
      {allChats.map((chat) => (
        <div
          key={chat.id}
          className="bg-primary/10 p-4 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* TODO: FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
            <div className={`avatar online`}>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-base-100 flex items-center justify-center">
                {chat.profilePicture ? (
                  <img
                    src={chat.profilePicture}
                    alt={chat.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="w-6 h-6 text-base-content" />
                )}
              </div>
            </div>
            <h4 className="text-base-content font-medium truncate">
              {chat.name}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
