"use client";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center gap-4">
      <button onClick={() => router.push("/login")} className="btn btn-primary">
        Login
      </button>
      <button onClick={() => router.push("/signup")} className="btn btn-ghost">
        Sing up
      </button>
      <button onClick={() => router.push("/chat")} className="btn btn-info">
        Chat
      </button>
    </div>
  );
};

export default LandingPage;
