import { motion } from 'framer-motion'
import { NavButtons } from '../NavButtons'

export function Step1({ resolution, setResolution, step, setStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl text-white">What's your resolution for 2025?</h2>
      <textarea
        value={resolution}
        onChange={(e) => setResolution(e.target.value)}
        className="w-full h-32 p-4 bg-white/5 text-white resize-none rounded-lg focus:ring-2 focus:ring-white/50 focus:outline-none"
        placeholder="Enter your resolution..."
      />
      <NavButtons step={step} setStep={setStep} resolution={resolution} />
    </motion.div>
  )
}