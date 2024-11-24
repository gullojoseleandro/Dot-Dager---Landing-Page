"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { getChannelData } from '@api/youtube-data'
import { FaYoutube } from 'react-icons/fa'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export default function SubscriberCount() {
  const [subscriberCount, setSubscriberCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    const username = 'DotDager'
    getChannelData(username)
      .then(data => {
        setSubscriberCount(data?.statistics?.subscriberCount || 0)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching subscriber count:', error)
        setError('Si estas leyendo esto es porque se quedó sin cuota la API :v')
        setIsLoading(false)
      })
    if(error !== null) {
      setTimeout(() => {
        toggleVisibility();
      }, 1000)
    }
  }, [error])

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  const toggleVisibility = () => setIsVisible(prev => !prev)

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: 50,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: 0.2
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            className="fixed bottom-20 left-4 bg-gradient-to-r from-gray-900 to-gray-800 text-yellow-400 p-4 rounded-lg shadow-xl z-40 border border-yellow-500 md:bottom-4"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            exit="exit"
          >
            <motion.div className="flex items-center mb-2" variants={iconVariants}>
              <FaYoutube className="text-red-600 text-3xl mr-2" />
              <h3 className="text-lg font-bold">Suscriptores</h3>
            </motion.div>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-lg"
                >
                  Cargando...
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-red-500 text-lg"
                >
                  {error}
                </motion.div>
              ) : (
                <motion.div
                  key="subscribers"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-2xl font-bold"
                >
                  {subscriberCount.toLocaleString()} Suscriptores
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 p-3 rounded-full shadow-xl z-50 border-2 border-gray-800 md:hidden"
        onClick={toggleVisibility}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isVisible ? (
            <motion.span
              key="hide"
              initial={{ opacity: 0, rotate: 180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -180 }}
              transition={{ duration: 0.3 }}
            >
              <EyeOffIcon className="h-6 w-6" />
              <span className="sr-only">Ocultar Suscriptores</span>
            </motion.span>
          ) : (
            <motion.span
              key="show"
              initial={{ opacity: 0, rotate: 180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -180 }}
              transition={{ duration: 0.3 }}
            >
              <EyeIcon className="h-6 w-6" />
              <span className="sr-only">Mostrar Suscriptores</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

