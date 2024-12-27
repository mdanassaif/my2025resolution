import { motion } from 'framer-motion'
import { RiDownloadLine, RiTwitterLine } from 'react-icons/ri'
import { NavButtons } from '../NavButtons'
import { downloadCard, shareOnTwitter } from '@/utils/helpers'
import { SITE_URL } from '@/constants'

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
 return (
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     className="space-y-6"
   >
     <div
       id="resolution-card"
       className={`w-full aspect-[3/4] relative overflow-hidden ${cardStyle.class}`}
       style={{
         backgroundImage: `url(${bgImage})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
       }}
     >
       <div className={`absolute inset-0 ${overlay.class}`} />
       <div className={`relative h-full p-8 flex flex-col ${layout.class}`}>
         <h2
           className={`text-4xl ${selectedFont.font.className}`}
           style={{ color: textColor }}
         >
           My 2025 Resolution
         </h2>
         <p
           className={`text-2xl mt-8 ${selectedFont.font.className}`}
           style={{ color: textColor }}
         >
           {resolution}
         </p>
         <p
           className={`text-xl mt-auto ${selectedFont.font.className}`}
           style={{ color: textColor }}
         >
           - {name}
         </p>
       </div>
     </div>
     <div className="flex gap-4">
       <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         onClick={() => downloadCard(setIsDownloading)}
         disabled={isDownloading}
         className="flex-1 bg-white p-4 text-black rounded-lg flex items-center justify-center gap-2"
       >
         <RiDownloadLine />
         {isDownloading ? 'Processing...' : 'Download'}
       </motion.button>
       <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         onClick={() => shareOnTwitter(resolution, SITE_URL)}
         className="flex-1 bg-[#1DA1F2] p-4 text-white rounded-lg flex items-center justify-center gap-2"
       >
         <RiTwitterLine />
         Share
       </motion.button>
     </div>
     <NavButtons step={step} setStep={setStep} />
   </motion.div>
 )
}