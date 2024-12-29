import { motion, AnimatePresence } from 'framer-motion'
import { NavButtons } from '../NavButtons'
import { RiLightbulbLine, RiMagicLine, RiRefreshLine } from 'react-icons/ri'
import { useState, useEffect } from 'react'

const resolutionSuggestions = [
  "Learn a new programming language",
  "Read 24 books this year",
  "Run a marathon",
  "Start a successful side project",
  "Learn to play an instrument",
  "Master a new cooking cuisine",
  "Travel to three new countries",
  "Launch my own business",
  "Achieve work-life balance",
  "Learn public speaking"
]

export function Step1({ resolution, setResolution, step, setStep }) {
  const [suggestions, setSuggestions] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [charCount, setCharCount] = useState(resolution.length)
  const [isFocused, setIsFocused] = useState(false)
  const maxChars = 280

  useEffect(() => {
    shuffleSuggestions()
  }, [])

  useEffect(() => {
    setCharCount(resolution.length)
  }, [resolution])

  const shuffleSuggestions = () => {
    const shuffled = [...resolutionSuggestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    setSuggestions(shuffled)
  }

  const generateResolution = async () => {
    setIsGenerating(true)
    // Simulate AI generation with random suggestions
    await new Promise(resolve => setTimeout(resolve, 1000))
    const randomSuggestion = resolutionSuggestions[Math.floor(Math.random() * resolutionSuggestions.length)]
    setResolution(randomSuggestion)
    setIsGenerating(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl text-white font-bold flex items-center gap-3"
      >
        <RiLightbulbLine className="text-3xl" />
        What's your resolution?
      </motion.h2>

      <motion.div 
        variants={itemVariants}
        className="relative"
      >
        <textarea
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your 2025 resolution..."
          maxLength={maxChars}
          className={`
            w-full h-32 p-4 bg-white/5 text-white rounded-lg resize-none
            focus:ring-2 focus:outline-none transition-all duration-300
            ${isFocused ? 'focus:ring-white/50 bg-white/10' : ''}
          `}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-2 right-2 text-sm text-gray-400"
        >
          {charCount}/{maxChars}
        </motion.div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateResolution}
          disabled={isGenerating}
          className="flex-1 bg-white/10 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white/15 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RiMagicLine className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RiMagicLine />
              Generate Ideas
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shuffleSuggestions}
          className="p-4 bg-white/10 text-white rounded-lg hover:bg-white/15 transition-colors"
          title="Shuffle suggestions"
        >
          <RiRefreshLine />
        </motion.button>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="space-y-2"
      >
        <p className="text-white/70 text-sm">Suggestions:</p>
        <div className="grid gap-2">
          <AnimatePresence mode="wait">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setResolution(suggestion)}
                className="text-left p-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                {suggestion}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <NavButtons step={step} setStep={setStep} resolution={resolution.trim().length > 0} />
    </motion.div>
  )
}