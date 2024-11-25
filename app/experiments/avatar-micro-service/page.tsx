"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function AvatarGenerator() {
  const [email, setEmail] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  useEffect(() => {
    if (email) {
      const url = `/api/avatar?email=${encodeURIComponent(email)}`
      setAvatarUrl(url)
    } else {
      setAvatarUrl("")
    }
  }, [email])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8 bg-white py-16 px-4 rounded-lg">
        {/* Avatar */}
        <div className="w-[280px] h-[280px] rounded-full overflow-hidden">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Generated avatar"
              width={280}
              height={280}
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        {/* Input */}
        <div className="w-full max-w-[280px] relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 py-2 px-0 text-center focus:outline-none focus:border-gray-600 transition-colors"
            placeholder="email"
            autoComplete="email"
          />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200" />
        </div>

        {/* Download Button */}
        {avatarUrl && (
          <a
            href={avatarUrl}
            download={`avatar-${email}.svg`}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-blue-600 transition-colors"
          >
            Download Avatar
          </a>
        )}
      </div>
    </div>
  )
}
