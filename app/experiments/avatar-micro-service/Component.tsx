"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

// Generate a random color
const generateRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;

export default function AvatarComponent() {
  const [email, setEmail] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [letterColors, setLetterColors] = useState<{ id: string; color: string }[]>([]);

  useEffect(() => {
    if (email) {
      const url = `/api/avatar?email=${encodeURIComponent(email)}&format=png`;
      setAvatarUrl(url);
    } else {
      setAvatarUrl("");
    }
  }, [email]);

  const handleInputChange = (value: string) => {
    const newLetterColors: { id: string; color: string }[] = [];
    for (let i = 0; i < value.length; i++) {
      newLetterColors.push({ id: uuidv4(), color: generateRandomColor() });
    }
    setEmail(value);
    setLetterColors(newLetterColors);
  };

  const downloadAvatar = (format: "svg" | "png") => {
    const url = `/api/avatar?email=${encodeURIComponent(email)}&format=${format}`;
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

        {/* Dynamic Input Display */}
        <div className="w-full max-w-[200px] flex justify-center">
          <div className="flex gap-1 border-b border-stone-600">
            {email.split("").map((letter, index) => (
              <span
                key={letterColors[index]?.id || index}
                style={{ color: letterColors[index]?.color || "white" }}
                className="text-stone-200 text-center"
              >
                {letter}
              </span>
            ))}
            <input
              type="text"
              value={email}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-0 bg-transparent border-none outline-none focus:ring-0"
              autoComplete="off"
            />
          </div>
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