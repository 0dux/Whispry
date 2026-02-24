import api from "@/lib/axios";
import { IAuthUser, IMessage } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface IUseChatStore {
  //states
  allContacts: IAuthUser[];
  allChats: IAuthUser[];
  messages: IMessage[];
  activeTab: "chat" | "contacts";
  selectedUser: IAuthUser | null;
  isUserLoading: boolean;
  isMessagesLoading: boolean;

  //functions
  setActiveTab: (tab: "chat" | "contacts") => Promise<void>;
  setSelectedUser: (selectedUser: IAuthUser | null) => Promise<void>;

  getAllContacts: () => Promise<void>;  
  getChatPartners: () => Promise<void>;
}

export const useChat = create<IUseChatStore>((set) => ({
  //states
  allContacts: [],
  allChats: [],
  messages: [],
  activeTab: "chat",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  //functions
  setActiveTab: async (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: async (selectedUser) => {
    set({ selectedUser: selectedUser });
  },

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const response = await api.get("/api/messages/contacts");
      set({ allContacts: response.data.contacts });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Some error has occured during user signup",
      );
    } finally {
      set({ isUserLoading: false });
    }
  },

  getChatPartners: async () => {
    set({ isMessagesLoading: true });
    try {
      const response = await api.get("/api/messages/chats");
      set({ allChats: response.data.chatPartners });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Some error has occured during user signup",
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
