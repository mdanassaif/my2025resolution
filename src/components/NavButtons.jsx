import { motion } from 'framer-motion'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'

export function NavButtons({ step, setStep, resolution }) {
  return (
    <div className="flex gap-4 mt-6">
      {step > 1 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(step - 1)}
          className="flex-1 bg-gray-800 text-white p-4 rounded-lg flex items-center justify-center gap-2"
        >
          <RiArrowLeftLine />
          Back
        </motion.button>
      )}
      {step < 6 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(step + 1)}
          className="flex-1 bg-white text-black p-4 rounded-lg flex items-center justify-center gap-2"
          disabled={!resolution && step === 1}
        >
          Next
          <RiArrowRightLine />
        </motion.button>
      )}
    </div>
  )
}