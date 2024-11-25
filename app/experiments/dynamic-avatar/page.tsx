"use client"

import { useState, useEffect } from "react"

export default function Page() {
  const [email, setEmail] = useState("")
  const [gradientColors, setGradientColors] = useState(["#ff65a3", "#ffa63d"])

  // Generate colors based on current input
  useEffect(() => {
    const generateColors = (input: string) => {
      if (!input) return ["#ff65a3", "#ffa63d"] // Default pink/orange

      const colors = [
        `hsl(${(input.length * 40) % 360}, 70%, 60%)`,
        `hsl(${((input.length * 40) + 60) % 360}, 70%, 60%)`
      ]
      return colors
    }

    setGradientColors(generateColors(email))
  }, [email])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8 bg-white py-16 px-4 rounded-lg">
        {/* Avatar */}
        <div
          className="w-[280px] h-[280px] rounded-full transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
          }}
          role="img"
          aria-label="Dynamic gradient avatar"
        />

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
      </div>
    </div>
  )
}
