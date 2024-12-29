import { motion, AnimatePresence } from 'framer-motion'
import { RiUploadCloud2Line, RiImageLine, RiDeleteBin6Line } from 'react-icons/ri'
import { NavButtons } from '../NavButtons'
import { backgrounds } from '@/constants'
import { useState, useCallback } from 'react'

export function Step3({ bgImage, setBgImage, fileInputRef, handleCustomBgUpload, step, setStep }) {
  const [hoveredBg, setHoveredBg] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragCounter, setDragCounter] = useState(0)

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

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    setDragCounter(prev => prev + 1)
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setDragCounter(prev => prev - 1)
    if (dragCounter - 1 === 0) {
      setIsDragging(false)
    }
  }, [dragCounter])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleCustomBgUpload({ target: { files: [file] } })
    }
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
        <RiImageLine className="text-3xl" />
        Choose a background
      </motion.h2>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-3 gap-4"
      >
        <AnimatePresence mode="wait">
          {backgrounds.map((bg) => (
            <motion.button
              key={bg}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setBgImage(bg)}
              onMouseEnter={() => setHoveredBg(bg)}
              onMouseLeave={() => setHoveredBg(null)}
              className={`
                aspect-square bg-cover rounded-lg transition-all relative
                ${bgImage === bg ? 'ring-2 ring-white' : 'hover:ring-1 hover:ring-white/50'}
                group overflow-hidden
              `}
              style={{ backgroundImage: `url(${bg})` }}
            >
              {(hoveredBg === bg || bgImage === bg) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                >
                  {bgImage === bg ? (
                    <span className="text-white bg-green-500/80 px-3 py-1 rounded-full text-sm">
                      Selected
                    </span>
                  ) : (
                    <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                      Click to select
                    </span>
                  )}
                </motion.div>
              )}
            </motion.button>
          ))}
        </AnimatePresence>

        <motion.div
          variants={itemVariants}
          className="relative"
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragging(false)
            setDragCounter(0)
            const file = e.dataTransfer.files[0]
            if (file && file.type.startsWith('image/')) {
              handleCustomBgUpload({ target: { files: [file] } })
            }
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className={`
              aspect-square rounded-lg flex flex-col items-center justify-center gap-3
              transition-all duration-300 border-2 border-dashed
              ${isDragging 
                ? 'bg-white/20 border-white scale-105' 
                : 'bg-white/10 hover:bg-white/15 border-white/30'}
            `}
          >
            <motion.div
              animate={{
                y: isDragging ? -10 : 0,
                scale: isDragging ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <RiUploadCloud2Line className={`
                w-12 h-12 transition-all duration-300
                ${isDragging ? 'text-white' : 'text-white/80'}
              `} />
            </motion.div>
            <div className="text-center">
              <p className={`text-sm transition-all duration-300 ${isDragging ? 'text-white' : 'text-white/80'}`}>
                {isDragging ? 'Drop image here' : (
                  <>
                    Drag & drop or
                    <span className="text-white underline ml-1 hover:text-blue-300">browse</span>
                  </>
                )}
              </p>
              <p className="text-white/60 text-xs mt-1">
                Supports: JPG, PNG, GIF
              </p>
            </div>
          </motion.button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomBgUpload}
            accept="image/*"
            className="hidden"
          />
        </motion.div>
      </motion.div>

      {bgImage && bgImage.startsWith('data:') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center"
        >
          <button
            onClick={() => setBgImage(null)}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <RiDeleteBin6Line />
            Remove custom background
          </button>
        </motion.div>
      )}

      <NavButtons step={step} setStep={setStep} />
    </motion.div>
  )
}