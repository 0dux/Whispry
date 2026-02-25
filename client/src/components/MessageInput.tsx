"use client";
import { useChat } from "@/store/useChatStore";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { sendMessage } = useChat();
  const handleSendMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    sendMessage({ text, image: imagePreview });

    setText("");
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
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
      setImagePreview(base64Image);
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };
  return (
    <div className="p-4 border-t bg-base-100 border-base-200">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-base-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-300 flex items-center justify-center text-base-content hover:bg-base-200"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex space-x-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="flex-1 bg-base-200 border border-base-300 rounded-lg py-2 px-4 text-base-content placeholder-base-content/50 focus:outline-none focus:border-primary"
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={`btn btn-circle btn-ghost btn-sm ${
            imagePreview
              ? "text-primary"
              : "text-base-content/70 hover:text-base-content"
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="btn btn-primary btn-sm rounded-lg px-4"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
