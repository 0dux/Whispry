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
  getMessagesByUserId: (userId: string | null) => Promise<void>;
  sendMessage: (messageData: {
    text?: string;
    image?: string | null;
  }) => Promise<void>;
}

export const useChat = create<IUseChatStore>((set, get) => ({
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

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await api.get(`/api/messages/${userId}`);
      set({ messages: response.data.messages });
    } catch (error: any) {
      console.error("Error during fetching messages::", error);
      toast.error("Some error has occured during fetching messages.");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    try {
      if (!data.text && !data.image) {
        toast.error("Cannot send an empty message");
        return;
      }
      const response = await api.post(
        `/api/messages/send/${selectedUser?.id}`,
        data,
      );
      set({ messages: messages.concat(response.data.newMessage) });
    } catch (error: any) {
      console.error("Error during sending messages::", error);
      toast.error("Some error has occured during sending messages.");
    }
  },
}));
