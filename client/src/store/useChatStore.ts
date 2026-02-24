import { IAuthUser, IMessage } from "@/types/types";
import { create } from "zustand";

interface IUseChatStore {
  allContacts: IAuthUser[];
  allChats: IAuthUser[];
  messages: IMessage[];
  activeTab: "chat" | "contacts";
  selectedUser: IAuthUser | null;
  isUserLoading: boolean;
  isMessagesLoading: boolean;
}

export const useChat = create<IUseChatStore>((set) => {});
