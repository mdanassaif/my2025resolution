import { motion, AnimatePresence } from 'framer-motion'
import { NavButtons } from '../NavButtons'
import { useState, useEffect } from 'react'
import { RiUserLine, RiCheckLine, RiCloseLine } from 'react-icons/ri'

export function Step2({ name, setName, step, setStep }) {
  const [isFocused, setIsFocused] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [showError, setShowError] = useState(false)

  // Validate name on change
  useEffect(() => {
    const valid = name.trim().length >= 2
    setIsValid(valid)
    if (name.trim().length > 0) {
      setShowError(!valid)
    }
  }, [name])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.h2 
        variants={childVariants}
        className="text-2xl text-white font-bold flex items-center gap-3"
      >
        <RiUserLine className="text-3xl" />
        What's your name?
      </motion.h2>

      <motion.div 
        variants={childVariants}
        className="relative"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full p-4 pl-12 bg-white/5 text-white rounded-lg
            focus:ring-2 focus:outline-none transition-all duration-300
            ${isFocused ? 'focus:ring-white/50 bg-white/10' : ''}
            ${isValid ? 'border-green-500' : showError ? 'border-red-500' : ''}
          `}
          placeholder="Enter your name..."
          maxLength={50}
          aria-label="Your name"
        />
        
        <RiUserLine 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" 
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <AnimatePresence>
            {showError && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-red-400 text-sm leading-none"
              >
                Min 2 chars
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {name.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center"
              >
                {isValid ? (
                  <RiCheckLine className="text-green-500 text-2xl" />
                ) : (
                  <RiCloseLine className="text-red-500 text-2xl" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p
          variants={childVariants}
          className="text-gray-400 text-sm mt-2"
        >
          {name.length}/50 characters
        </motion.p>
      </motion.div>

      <motion.div variants={childVariants}>
        <NavButtons step={step} setStep={setStep} resolution={isValid} />
      </motion.div>
    </motion.div>
  )
}