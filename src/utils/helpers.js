import { toPng } from 'html-to-image'
import confetti from 'canvas-confetti'

export const downloadCard = async (setIsDownloading) => {
  setIsDownloading(true)
  try {
    const image = await toPng(document.getElementById('resolution-card'))
    const link = document.createElement('a')
    link.download = `resolution-${Date.now()}.png`
    link.href = image
    link.click()
    confetti({
      particleCount: 300,
      spread: 180,
      origin: { y: 0.6 }
    })
  } catch (err) {
    console.error(err)
  }
  setIsDownloading(false)
}

export const shareOnTwitter = (resolution, SITE_URL) => {
  const text = `My 2025 Resolution: ${resolution}\n\nCreate yours at ${SITE_URL} 🎯✨`
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`)
}