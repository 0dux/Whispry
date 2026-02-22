import { create } from "zustand";

const useAuth = create((set) => ({
  authUser: {
    id: 1,
    name: "John Doe",
    age: 23,
  },

  isLoggedIn: false,
  isLoading: false,
  login: () => {
    console.log("We just logged in");
    set({ isLoggedIn: true });
  },
}));
