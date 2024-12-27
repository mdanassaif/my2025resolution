'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { StepIndicator } from '@/components/StepIndicator'
import  {Step1}  from '../components/Steps/Step1'
import  {Step2}  from '../components/Steps/Step2'
import  {Step3}  from '../components/Steps/Step3'
import  {Step4}  from '../components/Steps/Step4'
import  {Step5}  from '../components/Steps/Step5'
import  {Step6}  from '../components/Steps/Step6'
import { fonts } from '@/app/layout'
import { overlays, cardStyles, layouts, backgrounds } from '@/constants'

export default function Home() {
  const [step, setStep] = useState(1)
  const [resolution, setResolution] = useState('')
  const [name, setName] = useState('')
  const [bgImage, setBgImage] = useState(backgrounds[0])
  const [customBg, setCustomBg] = useState('')
  const [selectedFont, setSelectedFont] = useState(fonts[0])
  const [overlay, setOverlay] = useState(overlays[0])
  const [cardStyle, setCardStyle] = useState(cardStyles[0])
  const [layout, setLayout] = useState(layouts[0])
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const fileInputRef = useRef(null)

  const handleCustomBgUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCustomBg(e.target.result)
        setBgImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const stepComponents = {
    1: <Step1 {...{ resolution, setResolution, step, setStep }} />,
    2: <Step2 {...{ name, setName, step, setStep }} />,
    3: <Step3 {...{ bgImage, setBgImage, fileInputRef, handleCustomBgUpload, step, setStep }} />,
    4: <Step4 {...{ selectedFont, setSelectedFont, textColor, setTextColor, showColorPicker, setShowColorPicker, step, setStep }} />,
    5: <Step5 {...{ cardStyle, setCardStyle, overlay, setOverlay, step, setStep }} />,
    6: <Step6 {...{ cardStyle, bgImage, overlay, layout, selectedFont, textColor, resolution, name, isDownloading, setIsDownloading, step, setStep }} />
  }

  return (
    <main className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto pt-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold text-white mb-8 text-center ${fonts[0].font.className}`}
        >
          2025 Resolution Card
        </motion.h1>
        <StepIndicator step={step} setStep={setStep} />
        {stepComponents[step]}
      </div>
    </main>
  )
}