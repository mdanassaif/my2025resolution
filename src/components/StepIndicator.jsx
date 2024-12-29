import { motion, AnimatePresence } from 'framer-motion'
import { RiUserLine, RiText, RiImageLine, RiPaletteLine, RiLayoutLine, RiDownloadLine } from 'react-icons/ri'
import { useState } from 'react'

const steps = [
  { number: 1, icon: RiText, label: 'Resolution' },
  { number: 2, icon: RiUserLine, label: 'Name' },
  { number: 3, icon: RiImageLine, label: 'Background' },
  { number: 4, icon: RiPaletteLine, label: 'Style' },
  { number: 5, icon: RiLayoutLine, label: 'Layout' },
  { number: 6, icon: RiDownloadLine, label: 'Download' }
]

export function StepIndicator({ step, setStep }) {
  const [hoveredStep, setHoveredStep] = useState(null)

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= step) {
      setStep(stepNumber)
    }
  }

  const progressWidth = ((step - 1) / (steps.length - 1)) * 100

  return (
    <div className="relative mb-12">
      {/* Progress bar */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progressWidth}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map(({ number, icon: Icon, label }) => {
          const isActive = step >= number
          const isCurrent = step === number

          return (
            <motion.div
              key={number}
              className="relative"
              onMouseEnter={() => setHoveredStep(number)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStepClick(number)}
                className={`
                  relative z-10 w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? 'bg-white text-black' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }
                  ${isCurrent ? 'ring-4 ring-white/30' : ''}
                `}
                disabled={!isActive}
              >
                <Icon className="text-xl" />

                {/* Step number badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-xs rounded-full flex items-center justify-center"
                >
                  {number}
                </motion.div>
              </motion.button>

              {/* Label tooltip */}
              <AnimatePresence>
                {hoveredStep === number && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap"
                  >
                    <div className="bg-black px-3 py-1.5 rounded text-white text-sm">
                      {label}
                      {!isActive && (
                        <span className="block text-xs text-gray-400">
                          Complete previous steps first
                        </span>
                      )}
                    </div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Completion animation */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="absolute inset-0 bg-white rounded-full z-0"
                    layoutId="completion"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}