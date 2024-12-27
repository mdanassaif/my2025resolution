import { motion } from 'framer-motion'
import { SketchPicker } from 'react-color'
import { NavButtons } from '../NavButtons'
import { fonts } from '@/app/layout'

export function Step4({ selectedFont, setSelectedFont, textColor, setTextColor, showColorPicker, setShowColorPicker, step, setStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl text-white">Choose a font</h2>
      <div className="grid grid-cols-2 gap-4">
        {fonts.map((f) => (
          <motion.button
            key={f.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedFont(f)}
            className={`p-4 rounded-lg transition-all ${selectedFont.name === f.name ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
          >
            <span className={f.font.className}>{f.name}</span>
          </motion.button>
        ))}
      </div>
      <div className="space-y-4">
        <h3 className="text-white">Text Color</h3>
        <div
          className="w-full h-12 rounded-lg cursor-pointer"
          style={{ backgroundColor: textColor }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        {showColorPicker && (
          <div className="absolute z-10">
            <SketchPicker
              color={textColor}
              onChange={(color) => setTextColor(color.hex)}
            />
          </div>
        )}
      </div>
      <NavButtons step={step} setStep={setStep} />
    </motion.div>
  )
}