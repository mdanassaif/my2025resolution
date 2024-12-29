import { motion, AnimatePresence } from 'framer-motion'
import { SketchPicker } from 'react-color'
import { NavButtons } from '../NavButtons'
import { fonts } from '@/app/layout'
import { RiText, RiPaletteLine, RiCloseLine, RiAddLine, RiPaintBrushLine, RiPaletteFill } from 'react-icons/ri'
import { useState, useRef, useEffect } from 'react'

export function Step4({ selectedFont, setSelectedFont, textColor, setTextColor, showColorPicker, setShowColorPicker, step, setStep }) {
  const [hoveredFont, setHoveredFont] = useState(null)
  const [recentColors, setRecentColors] = useState([
    '#FFFFFF', 
    '#000000'
  ])
  const colorPickerRef = useRef(null)
  const [pickerType, setPickerType] = useState('wheel')

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setShowColorPicker])

  const addRecentColor = (color) => {
    const newRecentColors = [color, ...recentColors.filter(c => c !== color).slice(0, 4)]
    setRecentColors(newRecentColors)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
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
        <RiText className="text-3xl" />
        Choose your style
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-4"
      >
        {fonts.map((f) => (
          <motion.button
            key={f.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedFont(f)}
            onMouseEnter={() => setHoveredFont(f.name)}
            onMouseLeave={() => setHoveredFont(null)}
            className={`
              p-4 rounded-lg transition-all relative overflow-hidden group
              ${selectedFont.name === f.name
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/15'
              }
            `}
          >
            <span className={f.font.className}>{f.name}</span>
            {(hoveredFont === f.name || selectedFont.name === f.name) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-1 right-2 text-xs"
              >
                {selectedFont.name === f.name ? 'Selected' : 'Click to select'}
              </motion.div>
            )}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-white flex items-center gap-2">
            <RiPaletteLine />
            Text Color
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPickerType(pickerType === 'wheel' ? 'sketch' : 'wheel')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 
                     hover:bg-white/20 transition-all text-sm text-white"
          >
            {pickerType === 'wheel' ? (
              <>
                <RiPaintBrushLine /> Advanced
              </>
            ) : (
              <>
                <RiPaletteFill /> Simple
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {pickerType === 'wheel' ? (
            <motion.div
              key="wheel"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full flex justify-center"
            >
              <div className="relative w-64 h-64 bg-black/20 rounded-full backdrop-blur-sm border border-white/10">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {recentColors.map((color, index) => {
                    const angle = (index * (360 / recentColors.length)) * (Math.PI / 180);
                    const radius = 70;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    return (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          backgroundColor: color,
                          position: 'absolute',
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        onClick={() => setTextColor(color)}
                        className="w-14 h-14 rounded-full border-4 border-white/20 shadow-lg
                                 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                      >
                        {color === textColor && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 border-4 border-white rounded-full"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sketch"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-center"
            >
              <div className="p-2 bg-black/50 backdrop-blur-lg rounded-lg border border-white/10">
                <SketchPicker
                  color={textColor}
                  onChange={(color) => {
                    setTextColor(color.hex);
                    addRecentColor(color.hex);
                  }}
                  presetColors={recentColors}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <NavButtons step={step} setStep={setStep} />
    </motion.div>
  )
}

// Helper function to determine contrasting text color
function getContrastColor(hexcolor) {
  const r = parseInt(hexcolor.slice(1, 3), 16)
  const g = parseInt(hexcolor.slice(3, 5), 16)
  const b = parseInt(hexcolor.slice(5, 7), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? '#000000' : '#FFFFFF'
}