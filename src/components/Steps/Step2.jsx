import { motion } from 'framer-motion'
import { NavButtons } from '../NavButtons'

export function Step2({ name, setName, step, setStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl text-white">What's your name?</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-4 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-white/50 focus:outline-none"
        placeholder="Enter your name..."
      />
      <NavButtons step={step} setStep={setStep} />
    </motion.div>
  )
}