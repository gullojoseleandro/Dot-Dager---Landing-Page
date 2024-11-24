"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const BrandLogo = ({onClick}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Load custom font
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    // Delay the animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3700) // Adjust this value (in milliseconds) to match your initial animation duration

    return () => clearTimeout(timer)
  }, [])

  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 120,
        damping: 10
      }
    })
  }

  if (!isVisible) return null

  return (
    <motion.button 
      onClick={onClick}
      className="text-4xl font-bold mb-4 relative"
      style={{ fontFamily: "'Permanent Marker', cursive" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Array.from('Dot Dager').map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          custom={index}
          className={`inline-block ${letter === ' ' ? 'mr-2' : ''}`}
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            color: index < 3 ? '#FFD700' : '#FF6B6B'
          }}
        >
          {letter}
        </motion.span>
      ))}
      <motion.span
        className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-red-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
    </motion.button>
  )
}

export default BrandLogo

