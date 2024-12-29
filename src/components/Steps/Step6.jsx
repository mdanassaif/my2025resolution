import { motion, AnimatePresence } from 'framer-motion'
import { RiDownloadLine, RiTwitterLine, RiShareLine, RiCheckLine, RiFileCopyLine } from 'react-icons/ri'
import { NavButtons } from '../NavButtons'
import { downloadCard, shareOnTwitter } from '@/utils/helpers'
import { SITE_URL } from '@/constants'
import { useState, useEffect } from 'react'

export function Step6({ 
  cardStyle, 
  bgImage, 
  overlay, 
  layout, 
  selectedFont, 
  textColor, 
  resolution, 
  name, 
  isDownloading,
  setIsDownloading,
  step,
  setStep 
}) {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [copied, setCopied] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  useEffect(() => {
    if (isDownloading) {
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) return prev
          return prev + 10
        })
      }, 200)
      return () => clearInterval(interval)
    } else {
      setDownloadProgress(0)
    }
  }, [isDownloading])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My 2025 Resolution',
          text: resolution,
          url: SITE_URL
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      setShowShareOptions(true)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${SITE_URL}?resolution=${encodeURIComponent(resolution)}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="relative group"
      >
        <div
          id="resolution-card"
          className={`
            w-full aspect-[3/4] relative overflow-hidden
            ${cardStyle.class}
            transform transition-transform duration-300 group-hover:scale-[1.02]
          `}
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {overlay.name === 'Blur' ? (
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)',
                opacity: 0.8
              }}
            />
          ) : (
            <div 
              className={`absolute inset-0 ${overlay.value}`}
            />
          )}
          
          <div className={`relative h-full p-8 flex flex-col ${layout.class}`}>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`text-4xl ${selectedFont.font.className}`}
              style={{ color: textColor }}
            >
              My 2025 Resolution
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-2xl mt-8 ${selectedFont.font.className}`}
              style={{ color: textColor }}
            >
              {resolution}
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-xl mt-auto ${selectedFont.font.className}`}
              style={{ color: textColor }}
            >
              - {name}
            </motion.p>
          </div>
        </div>

        {/* Download progress overlay */}
        <AnimatePresence>
          {isDownloading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-white mt-4">Processing... {downloadProgress}%</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => downloadCard(setIsDownloading)}
          disabled={isDownloading}
          className="flex-1 bg-white p-4 text-black rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        >
          <RiDownloadLine className="text-xl" />
          {isDownloading ? 'Processing...' : 'Download'}
        </motion.button>

        <motion.div className="flex-1 relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="w-full bg-[#1DA1F2] p-4 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#1a94e0] transition-colors"
          >
            <RiShareLine className="text-xl" />
            Share
          </motion.button>

          <AnimatePresence>
            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => shareOnTwitter(resolution, SITE_URL)}
                  className="w-full p-3 flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <RiTwitterLine className="text-[#1DA1F2]" />
                  Share on Twitter
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full p-3 flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  {copied ? <RiCheckLine className="text-green-500" /> : <RiFileCopyLine />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <NavButtons step={step} setStep={setStep} />
    </motion.div>
  )
}