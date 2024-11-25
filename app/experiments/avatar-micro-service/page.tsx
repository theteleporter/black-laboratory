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
    <div className="min-h-screen bg-[#161616] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8 bg-[#161616] py-16 px-4 rounded-lg">
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
            <div className="w-full h-full bg-gradient-to-br from-[#ff65a3] to-[#ffa63d]" />
          )}
        </div>

        {/* Input */}
        <div className="w-full max-w-[280px] relative">
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

        {/* Download Button */}
        {avatarUrl && (
          <a
            href={avatarUrl}
            download={`avatar-${email}.svg`}
            className="mt-4 px-4 py-2 bg-[#232323] text-white rounded hover:bg-[#202020] transition-colors"
          >
            Download Avatar
          </a>
        )}
      </div>
    </div>
  )
}
