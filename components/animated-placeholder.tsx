'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function AnimatedPlaceholder() {
  const [dots, setDots] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-flex items-center">
      START TYPING
      <span className="w-12 inline-block">
        <motion.span
          animate={{ opacity: dots >= 1 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: dots >= 2 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: dots >= 3 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          .
        </motion.span>
      </span>
    </span>
  )
}