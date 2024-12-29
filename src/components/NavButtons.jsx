import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { useEffect } from 'react'

export function NavButtons({ step, setStep, resolution }) {
  const MIN_STEP = 1;
  const MAX_STEP = 6;

  const progress = (step / MAX_STEP) * 100;

  const handleNavigate = (direction) => {
    const newStep = step + direction;
    if (newStep >= MIN_STEP && newStep <= MAX_STEP) {
      setStep(newStep);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' && step < MAX_STEP && (resolution || step !== MIN_STEP)) {
        handleNavigate(1);
      } else if (e.key === 'ArrowLeft' && step > MIN_STEP) {
        handleNavigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step, resolution]);

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex gap-4">
        <AnimatePresence mode="wait">
          {step > MIN_STEP && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate(-1)}
              className="flex-1 bg-gray-800 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors relative group"
              aria-label="Go to previous step"
            >
              <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Step {step - 1}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step < MAX_STEP && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate(1)}
              className="flex-1 bg-white text-black p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors relative group disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!resolution && step === MIN_STEP}
              aria-label="Go to next step"
            >
              <span>Next</span>
              <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Step {step + 1}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Step indicator */}
      <div className="text-center text-sm text-gray-400">
        Step {step} of {MAX_STEP}
      </div>
    </div>
  )
}