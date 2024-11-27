"use client"

import { useState, useEffect } from "react"

export default function Component() {
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
    <div className="min-h-screen bg-[#161616] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8 bg-[#161616] py-16 px-4 rounded-lg">
        {/* Avatar */}
        <div
          className="w-[120px] h-[120px] rounded-full transition-all duration-700"
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
            className="w-full bg-transparent border-b border-stone-600 py-2 px-0 text-center focus:outline-none focus:border-[#6f6f6f] transition-colors"
            placeholder="email"
            autoComplete="email"
          />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#161616]" />
        </div>
      </div>
    </div>
  )
}
