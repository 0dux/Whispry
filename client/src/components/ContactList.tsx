import { useAuth } from "@/store/useAuthStore";
import { useChat } from "@/store/useChatStore";
import { User } from "lucide-react";
import { useEffect } from "react";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

const ContactList = () => {
  const { getAllContacts, allContacts, isUserLoading, setSelectedUser } =
    useChat();
  const { onlineUsers } = useAuth();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) {
    return <UserLoadingSkeleton />;
  }

  return (
    <div className="space-y-2">
      {allContacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-primary/10 p-4 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${onlineUsers.includes(contact.id) ? "avatar-online" : "avatar-offline"}`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-base-100 flex items-center justify-center">
                {contact.profilePicture ? (
                  <img
                    src={contact.profilePicture}
                    alt={contact.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="w-6 h-6 text-base-content" />
                )}
              </div>
            </div>
            <h4 className="text-base-content font-medium truncate">
              {contact.name}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
