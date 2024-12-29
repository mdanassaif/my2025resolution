import { motion, AnimatePresence } from 'framer-motion'
import { NavButtons } from '../NavButtons'
import { cardStyles, overlays } from '@/constants'
import { RiLayoutLine, RiFilter3Line, RiInformationLine } from 'react-icons/ri'
import { useState } from 'react'

export function Step5({ cardStyle, setCardStyle, overlay, setOverlay, step, setStep }) {
  const [hoveredOption, setHoveredOption] = useState(null)
  const [activePreview, setActivePreview] = useState(null)

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

  const PreviewTooltip = ({ title, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute -top-24 left-1/2 -translate-x-1/2 bg-black/90 p-3 rounded-lg w-48 z-10"
    >
      <p className="text-white text-sm font-medium">{title}</p>
      <p className="text-white/70 text-xs mt-1">{description}</p>
    </motion.div>
  )

  const handleOverlayChange = (selectedOverlay) => {
    setOverlay(selectedOverlay);
    console.log('Overlay selected:', selectedOverlay.name, selectedOverlay.value);
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl text-white font-bold flex items-center gap-3"
      >
        <RiLayoutLine className="text-3xl" />
        Choose style options
      </motion.h2>

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-white flex items-center gap-2">
            <RiLayoutLine />
            Card Style
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {cardStyles.map((style) => (
              <motion.button
                key={style.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCardStyle(style)}
                onMouseEnter={() => setHoveredOption(style.name)}
                onMouseLeave={() => setHoveredOption(null)}
                className={`
                  relative p-4 rounded-lg transition-all
                  ${cardStyle.name === style.name 
                    ? 'bg-white text-black' 
                    : 'bg-white/10 text-white hover:bg-white/15'
                  }
                  group
                `}
              >
                <span className="flex items-center gap-2">
                  {style.name}
                  <RiInformationLine 
                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                    onMouseEnter={() => setActivePreview(style.name)}
                    onMouseLeave={() => setActivePreview(null)}
                  />
                </span>

                <AnimatePresence>
                  {activePreview === style.name && (
                    <PreviewTooltip 
                      title={style.name}
                      description={style.description || "A unique card style option"}
                    />
                  )}
                </AnimatePresence>

                {cardStyle.name === style.name && (
                  <motion.div
                    layoutId="selectedStyle"
                    className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white flex items-center gap-2">
            <RiFilter3Line />
            Overlay Effect
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {overlays.map((o) => (
              <motion.button
                key={o.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOverlayChange(o)}
                onMouseEnter={() => setHoveredOption(o.name)}
                onMouseLeave={() => setHoveredOption(null)}
                className={`
                  relative p-4 rounded-lg transition-all
                  ${overlay.name === o.name 
                    ? 'bg-white text-black' 
                    : 'bg-white/10 text-white hover:bg-white/15'
                  }
                  group
                `}
              >
                <span className="flex items-center gap-2">
                  {o.name}
                  <RiInformationLine 
                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                    onMouseEnter={() => setActivePreview(o.name)}
                    onMouseLeave={() => setActivePreview(null)}
                  />
                </span>

                <AnimatePresence>
                  {activePreview === o.name && (
                    <PreviewTooltip 
                      title={o.name}
                      description={o.description || "An overlay effect for your card"}
                    />
                  )}
                </AnimatePresence>

                {overlay.name === o.name && (
                  <motion.div
                    layoutId="selectedOverlay"
                    className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <NavButtons step={step} setStep={setStep} />
      </motion.div>
    </motion.div>
  )
}