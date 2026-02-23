"use client";
import { useAuth } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { verifyUser, isVerifyingUser, authUser } = useAuth();
  const router = useRouter();

  // Check auth status on mount
  useEffect(() => {
    verifyUser();
  }, []);

  // If already authenticated, redirect to chat
  useEffect(() => {
    if (isVerifyingUser) return;
    if (authUser) {
      router.replace("/chat");
    }
  }, [authUser, isVerifyingUser, router]);

  // Show loader while checking auth
  if (isVerifyingUser) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  // If not authenticated, render the auth page (login/signup)
  if (!authUser) {
    return <>{children}</>;
  }

  // Fallback loader while redirecting
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 size={20} className="animate-spin" />
    </div>
  );
};

export default AuthLayout;
