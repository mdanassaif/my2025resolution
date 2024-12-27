import { motion } from 'framer-motion'

export function StepIndicator({ step, setStep }) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <motion.div
          key={i}
          className={`w-3 h-3 rounded-full cursor-pointer ${step === i ? 'bg-white' : 'bg-white/30'}`}
          onClick={() => setStep(i)}
          whileHover={{ scale: 1.2 }}
        />
      ))}
    </div>
  )
}