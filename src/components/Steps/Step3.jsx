import { motion } from 'framer-motion'
import { RiUploadCloud2Line } from 'react-icons/ri'
import { NavButtons } from '../NavButtons'
import { backgrounds } from '@/constants'

export function Step3({ bgImage, setBgImage, fileInputRef, handleCustomBgUpload, step, setStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl text-white">Choose a background</h2>
      <div className="grid grid-cols-2 gap-4">
        {backgrounds.map((bg) => (
          <motion.button
            key={bg}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setBgImage(bg)}
            className={`aspect-square bg-cover rounded-lg transition-all ${bgImage === bg ? 'ring-2 ring-white' : ''}`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square bg-white/10 rounded-lg flex items-center justify-center"
        >
          <RiUploadCloud2Line className="w-8 h-8 text-white" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomBgUpload}
            accept="image/*"
            className="hidden"
          />
        </motion.button>
      </div>
      <NavButtons step={step} setStep={setStep} />
    </motion.div>
  )
}