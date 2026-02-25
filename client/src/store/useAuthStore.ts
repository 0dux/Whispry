import api from "@/lib/axios";
import { IAuthUser, ILoginForm, ISignUpForm } from "@/types/types";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface IAuthStore {
  authUser: IAuthUser | null;

  isVerifyingUser: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdating: boolean;
  socket: any;
  onlineUsers: string[];

  verifyUser: () => Promise<void>;
  signUp: (data: ISignUpForm) => Promise<void>;
  login: (data: ILoginForm) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profilePicture: string) => Promise<void>;
  connectSocket: () => Promise<void>;
  disconnectSocket: () => Promise<void>;
}

export const useAuth = create<IAuthStore>((set, get) => ({
  authUser: null,

  //loading states
  isVerifyingUser: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdating: false,
  socket: null,
  onlineUsers: [],

  verifyUser: async () => {
    try {
      const response = await api.get("/api/auth/verify");
      // console.log(response);
      set({ authUser: response.data.user });
      get().connectSocket();
    } catch (error: any) {
      // console.error(error);
      set({ authUser: null });
    } finally {
      set({ isVerifyingUser: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/api/auth/register", data);
      // console.log("User signup successfull\n", response);
      toast.success("Account created successfully");
      set({ authUser: response.data.user });
      get().connectSocket();
    } catch (error: any) {
      // console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Some error has occured during user signup",
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/api/auth/login", data);
      // console.log("Login successfull\n", response);
      toast.success("Logged in successfully");
      set({ authUser: response.data.user });
      get().connectSocket();
    } catch (error: any) {
      // console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Some error has occured during logging in",
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/api/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error("Error logging out");
      console.error(error);
    }
  },

  updateProfile: async (profilePicture) => {
    set({ isUpdating: true });
    try {
      const response = await api.put("/api/auth/update-profile", {
        profilePicture,
      });
      set({ authUser: response.data.user });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile::", error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUpdating: false });
    }
  },

  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      withCredentials: true,
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: async () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
