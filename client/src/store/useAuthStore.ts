import api from "@/lib/axios";
import { create } from "zustand";

interface IAuthUser {
  id: string;
  name: string;
  pfp: string;
}
interface IAuthStore {
  authUser: IAuthUser | null;
  isCheckingUser: boolean;
  checkUser: () => Promise<void>;
}

export const useAuth = create<IAuthStore>((set) => ({
  authUser: null,

  //verify user
  isCheckingUser: true,

  checkUser: async () => {
    try {
      const response = await api.get("/api/auth/verify");
      console.log(response);
      set({ authUser: response.data });
    } catch (error: any) {
      console.error(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingUser: false });
    }
  },
}));
