"use client";
import { useAuth } from "@/store/useAuthStore";
import { Loader2, LogOut, User } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const ProfileHeader = () => {
  const { logout, authUser, updateProfile, isUpdating } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setSelectedImage(base64Image);
      await updateProfile(base64Image);
    };
  };

  return (
    <div className="flex items-center justify-between px-4 pb-4 border-b border-neutral-300">
      <div className="flex items-center gap-3">
        {/* Avatar with Status Badge */}
        <div className="relative avatar avatar-online">
          <div
            className={`group relative flex items-center justify-center w-12 h-12 overflow-hidden rounded-full cursor-pointer bg-base-100/50 transition-colors ${
              isUpdating ? "pointer-events-none" : "hover:bg-base-200"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
              disabled={isUpdating}
            />

            {/* Loading Overlay */}
            {isUpdating && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            )}

            {/* Profile Image (prioritize selectedImage, then authUser.profilePicture, then User icon) */}
            {selectedImage || authUser?.profilePicture ? (
              <img
                src={selectedImage || authUser?.profilePicture || ""}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="w-6 h-6 text-base-content/70" />
            )}

            {/* Hover Change Overlay */}
            {!isUpdating && (
              <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black/40 opacity-0 group-hover:opacity-100">
                <span className="text-[10px] font-medium text-white">
                  Change
                </span>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <h2 className="text-base font-semibold leading-tight">
            {authUser?.name || "User"}
          </h2>
          <span className="text-sm text-base-content/60">Online</span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        type="button"
        title="Logout"
        className="p-2 transition-colors rounded-xl hover:bg-base-200 text-base-content/70 hover:text-base-content"
        onClick={() => {
          logout();
        }}
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProfileHeader;
