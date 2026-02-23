"use client";
import { useAuth } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChatPage = () => {
  const { verifyUser, isVerifyingUser, authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    verifyUser();
  }, []);

  // If not authenticated, redirect to login
  useEffect(() => {
    if (isVerifyingUser) return;
    if (!authUser) {
      router.replace("/login");
    }
  }, [authUser, isVerifyingUser, router]);

  if (isVerifyingUser) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  if (!authUser) {
    return null; // don't render anything while redirecting
  }

  return <div>Chat Page</div>;
};

export default ChatPage;
