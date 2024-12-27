import { motion } from 'framer-motion'
import { NavButtons } from '../NavButtons'
import { cardStyles, overlays } from '@/constants'

export function Step5({ cardStyle, setCardStyle, overlay, setOverlay, step, setStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl text-white">Choose style options</h2>
      <div className="space-y-4">
        <h3 className="text-white">Card Style</h3>
        <div className="grid grid-cols-2 gap-4">
          {cardStyles.map((style) => (
            <motion.button
              key={style.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCardStyle(style)}
              className={`p-4 rounded-lg transition-all ${cardStyle.name === style.name ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
            >
              {style.name}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-white">Overlay</h3>
        <div className="grid grid-cols-2 gap-4">
          {overlays.map((o) => (
            <motion.button
              key={o.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOverlay(o)}
              className={`p-4 rounded-lg transition-all ${overlay.name === o.name ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
            >
              {o.name}
            </motion.button>
          ))}
        </div>
      </div>
      <NavButtons step={step} setStep={setStep} />
    </motion.div>
  )
}