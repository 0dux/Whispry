import api from "@/lib/axios";
import { IAuthUser, ILoginForm, ISignUpForm } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface IAuthStore {
  authUser: IAuthUser | null;

  isVerifyingUser: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;

  verifyUser: () => Promise<void>;
  signUp: (data: ISignUpForm) => Promise<void>;
  login: (data: ILoginForm) => Promise<void>;
}

export const useAuth = create<IAuthStore>((set) => ({
  authUser: null,

  //loading states
  isVerifyingUser: true,
  isSigningUp: false,
  isLoggingIn: false,

  verifyUser: async () => {
    try {
      const response = await api.get("/api/auth/verify");
      // console.log(response);
      set({ authUser: response.data.user });
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
}));
