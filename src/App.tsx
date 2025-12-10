import { useState, useEffect } from 'react'
import { Upload } from 'lucide-react'
import { cn } from './lib/utils'

import { ImageProcessor } from './components/ImageProcessor'
import { TiltCard } from './components/TiltCard'
import { Button } from './components/Button'
import heroImage from './assets/hero.png'
import ringPath from './assets/ring.png'
import ambujaLogo from './assets/ambuja logo.png'
import accLogo from './assets/acc logo.png'
import adaniLogo from './assets/ADANI-Cement.png'

function App() {
  const [image, setImage] = useState<File | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll for sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#160C1D] text-foreground flex flex-col items-center p-4 py-8 md:py-12 selection:bg-blue-500/30 overflow-x-hidden relative">

      {/* Logos Bar - Fixed/Sticky */}
      <div
        className={cn(
          "fixed top-0 inset-x-0 z-50 p-4 md:p-2 flex justify-between items-start transition-all duration-300",
          // Always present border to prevent layout shift (flicker)
          "border-b border-transparent",
          // Mobile: Add blur and visibility on scroll
          isScrolled
            ? "bg-[#160C1D]/80 backdrop-blur-md border-white/5"
            : "",
          // Desktop: Reset styles (no border/blur needed)
          "md:bg-transparent md:backdrop-blur-none md:border-none",
          // Base interaction
          "pointer-events-none" // Content itself (images) will need pointer-events-auto if interactive, but here they are just display
        )}
      >
        {/* Left: Ambuja | ACC */}
        <div className="flex items-center gap-2 md:gap-2 p-1">
          <img src={ambujaLogo} alt="Ambuja Cement" className="h-10 md:h-16 object-contain opacity-90" />
          <div className="w-px h-8 bg-white/20"></div>
          <img src={accLogo} alt="ACC" className="h-10 md:h-16 object-contain opacity-90" />
        </div>

        {/* Right: Adani Cement */}
        <div className="p-1">
          <img src={adaniLogo} alt="Adani Cement" className="h-10 md:h-16 object-contain opacity-90" />
        </div>
      </div>
      <header className="relative pt-20 md:pt-24 text-center space-y-4 shrink-0 px-4 z-20 max-w-2xl">
        <div className="space-y-0.5">
          {/*<p className="text-[#A984C7] text-[10px] md:text-sm font-medium tracking-wide uppercase">
            ADANI CEMENT CEO CLUB MEMBER
          </p>*/}
          <h1 className="text-2xl md:text-4xl font-black tracking-tighter bg-gradient-to-b from-[#F1E9F6] to-[#DECCEB] bg-clip-text text-transparent drop-shadow-sm px-4">
            ADANI CEMENT CEO CLUB MEMBER
          </h1>
        </div>
        <p className="text-white/60 text-xs md:text-sm font-light tracking-wide text-center leading-relaxed">
          The Adani Cement CEO Club is an exclusive circle for our top-performing dealers, the ones who consistently deliver results and drive growth.
        </p>
      </header>

      <main className="w-full flex-1 flex flex-col items-center justify-center min-h-0 py-8 md:py-12 mt-8 md:mt-12">
        {!image ? (
          <div className="flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-sm md:max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 h-full">

            {/* 3:4 Hero Card Container - Width-Based Scaling */}
            {/* Switched to width-based sizing to prevent shrinking on small vertical screens */}
            <TiltCard
              className="relative w-full max-w-[320px] md:max-w-[360px] aspect-[3/4] shrink-0"
              tiltClassName="bg-gradient-to-br from-[#321A42] to-[#24132F] rounded-[2rem] border border-[#24132F] shadow-2xl flex items-center justify-center p-6 overflow-hidden"
            >

              {/* Bottom Badge Text */}
              <div className="absolute bottom-6 inset-x-0 z-30 pointer-events-none flex justify-center">
                <p className="text-white/40 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-center">
                  Proud Member of CEO Club
                </p>
              </div>

              {/* Static Hero Image with Ring Frame */}
              <div className="relative w-[85%] aspect-square shrink-0">
                {/* Ring Image (Frame) */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <img src={ringPath} alt="" className="w-full h-full object-contain" />
                </div>

                {/* Content Image (Inset to sit inside ring) */}
                <div className="absolute inset-1 z-10 rounded-full overflow-hidden shadow-2xl bg-black">
                  <img
                    src={heroImage}
                    alt="Example"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Glow/Shadow behind */}
                <div className="absolute inset-4 -z-10 rounded-full bg-blue-500/20 blur-3xl"></div>
              </div>

              {/* Card Gloss Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
            </TiltCard>

            {/* Upload Button */}
            <div className="w-full max-w-[320px] md:max-w-[360px] relative group shrink-0">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImage(e.target.files[0])
                  }
                }}
                id="image-upload"
              />
              <Button
                as="label"
                htmlFor="image-upload"
              >
                <Upload className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                <span className="font-semibold text-base md:text-lg">Upload Photo</span>
              </Button>
            </div>
          </div>
        ) : (
          <ImageProcessor
            file={image}
            onReset={() => setImage(null)}
          />
        )}
      </main>
    </div>
  )
}

export default App
