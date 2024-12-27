 
import "./globals.css";

import { Playfair_Display, DM_Sans, Bebas_Neue, Space_Grotesk, Montserrat, Lora } from 'next/font/google'

export const playfair = Playfair_Display({ subsets: ['latin'] })
export const dmSans = DM_Sans({ subsets: ['latin'] })
export const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })
export const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
export const montserrat = Montserrat({ subsets: ['latin'] })
export const lora = Lora({ subsets: ['latin'] })

export const fonts = [
  { name: 'Playfair', font: playfair },
  { name: 'DM Sans', font: dmSans },
  { name: 'Bebas Neue', font: bebasNeue },
  { name: 'Space Grotesk', font: spaceGrotesk },
  { name: 'Montserrat', font: montserrat },
  { name: 'Lora', font: lora }
]

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
