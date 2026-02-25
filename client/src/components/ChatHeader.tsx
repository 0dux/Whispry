import { useAuth } from "@/store/useAuthStore";
import { useChat } from "@/store/useChatStore";
import { User, X } from "lucide-react";
import { useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChat();
  const { onlineUsers } = useAuth();
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-base-100/50 border-b border-base-300 max-h-21 p-4 flex-1">
      {selectedUser && (
        <>
          <div className="flex items-center space-x-3">
            <div
              className={`avatar ${onlineUsers.includes(selectedUser.id) ? "avatar-online" : "avatar-offline"}`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-base-200 flex items-center justify-center">
                {selectedUser.profilePicture ? (
                  <img
                    src={selectedUser.profilePicture}
                    alt={selectedUser.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="w-6 h-6 text-base-content/70" />
                )}
              </div>
            </div>
            <div>
              <h3 className="text-base-content font-medium">
                {selectedUser.name}
              </h3>
              <p className="text-base-content/60 text-sm">
                {onlineUsers.includes(selectedUser.id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="p-2 transition-colors rounded-xl text-base-content/70 hover:bg-base-200 hover:text-base-content"
            onClick={() => setSelectedUser(null)}
          >
            <X className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default ChatHeader;
