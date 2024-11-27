"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AvatarComponent() {
  const [email, setEmail] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (email) {
      // Updated URL structure
      const url = `/${encodeURIComponent(email)}`;
      setAvatarUrl(url);
    } else {
      setAvatarUrl("");
    }
  }, [email]);

  const downloadAvatar = (format: "svg" | "png") => {
    // Updated URL structure with format
    const url = `/${encodeURIComponent(email)}?format=${format}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = `avatar-${email}.${format}`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#161616] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8 bg-[#161616] py-16 px-4 rounded-lg">
        {/* Avatar */}
        <div className="w-[120px] h-[120px] overflow-hidden">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Generated avatar"
              width={120}
              height={120}
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#232323] to-[#232323]" />
          )}
        </div>

        {/* Input */}
        <div className="w-full max-w-[200px] relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-stone-600 py-2 px-0 text-center focus:outline-none focus:border-[#6f6f6f] transition-colors text-stone-200"
            placeholder="email"
            autoComplete="email"
          />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#161616]" />
        </div>

        {/* Download Buttons */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => downloadAvatar("svg")}
            disabled={!email}
            className={`px-4 py-2 rounded transition-colors ${
              email
                ? "bg-[#232323] text-white hover:bg-[#202020]"
                : "bg-[#2a2a2a] text-stone-500 cursor-not-allowed"
            }`}
          >
            Download SVG
          </button>
          <button
            onClick={() => downloadAvatar("png")}
            disabled={!email}
            className={`px-4 py-2 rounded transition-colors ${
              email
                ? "bg-[#232323] text-white hover:bg-[#202020]"
                : "bg-[#2a2a2a] text-stone-500 cursor-not-allowed"
            }`}
          >
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}