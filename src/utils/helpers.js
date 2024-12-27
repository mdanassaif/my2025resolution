// utils/helpers.js
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

// Function to upload image to a hosting service
async function uploadImage(imageBlob) {
  // Example using Cloudinary - you'll need to set up your own account
  const formData = new FormData();
  formData.append('file', imageBlob);
  formData.append('upload_preset', 'newyear'); // Replace with your upload preset

  const response = await fetch(
    'https://api.cloudinary.com/v1_1/dpsfeltsj/image/upload', // Replace with your cloud name
    {
      method: 'POST',
      body: formData
    }
  );

  const data = await response.json();
  return data.secure_url;
}

// Convert base64 to blob
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}

export const shareOnTwitter = async (resolution, SITE_URL) => {
  try {
    // Generate image
    const imageDataUrl = await toPng(document.getElementById('resolution-card'));
    
    // Convert to blob
    const imageBlob = dataURLtoBlob(imageDataUrl);
    
    // Upload image
    const imageUrl = await uploadImage(imageBlob);
    
    // Create tweet text with image
    const text = `My 2025 Resolution: ${resolution}\n\nCreate yours at ${SITE_URL} 🎯✨`;
    
    // Open Twitter share dialog with image
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(imageUrl)}`,
      '_blank'
    );
  } catch (err) {
    console.error('Error sharing:', err);
  }
}

export const downloadCard = async (setIsDownloading) => {
  setIsDownloading(true);
  try {
    const image = await toPng(document.getElementById('resolution-card'));
    const link = document.createElement('a');
    link.download = `resolution-${Date.now()}.png`;
    link.href = image;
    link.click();
    confetti({
      particleCount: 300,
      spread: 180,
      origin: { y: 0.6 }
    });
  } catch (err) {
    console.error(err);
  }
  setIsDownloading(false);
}