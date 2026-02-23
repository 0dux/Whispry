"use client";
import { useAuth } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LandingPage = () => {
  const { verifyUser, isVerifyingUser, authUser } = useAuth();
  const router = useRouter();

  // Check auth status on mount
  useEffect(() => {
    verifyUser();
  }, []);

  // Redirect based on auth status
  useEffect(() => {
    if (isVerifyingUser) return;
    if (authUser) {
      router.replace("/chat");
    } else {
      router.replace("/login");
    }
  }, [authUser, isVerifyingUser, router]);

  // Show loader while checking / redirecting
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2 size={20} className="animate-spin" />
    </div>
  );
};

export default LandingPage;
