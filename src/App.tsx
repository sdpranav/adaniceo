import { useState, useEffect } from 'react'
import { Upload } from 'lucide-react'
import { cn } from './lib/utils'

import { ImageProcessor } from './components/ImageProcessor'
import { TiltCard } from './components/TiltCard'
import { Button } from './components/Button'
import heroImage from './assets/hero.png'
import ambujaLogo from './assets/ambuja logo.png'
import accLogo from './assets/acc logo.png'
import adaniLogo from './assets/ADANI-Cement.png'
import { TEMPLATES, type Template } from './constants/templates'

function App() {
  const [image, setImage] = useState<File | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState<Template>(TEMPLATES[0])

  // Handle scroll for sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="h-[100dvh] md:h-auto md:min-h-screen bg-[var(--bg-primary)] text-foreground flex flex-col items-center md:p-4 md:py-12 selection:bg-blue-500/30 overflow-hidden md:overflow-visible overflow-x-hidden relative transition-colors duration-700"
      style={{
        '--bg-primary': activeTemplate.theme.background,
        '--card-from': activeTemplate.theme.cardGradientFrom,
        '--card-to': activeTemplate.theme.cardGradientTo,
        '--card-border': activeTemplate.theme.cardBorder,
        '--text-from': activeTemplate.theme.textGradientFrom,
        '--text-to': activeTemplate.theme.textGradientTo,
        '--accent-glow': activeTemplate.theme.accentGlow,
        '--btn-color': activeTemplate.theme.buttonColor,
        '--btn-hover': activeTemplate.theme.buttonHoverColor,
        '--btn-border': activeTemplate.theme.buttonBorder,
        '--btn-border-hover': activeTemplate.theme.buttonBorderHover,
      } as React.CSSProperties}
    >

      {/* Logos Bar - Fixed/Sticky */}
      <div
        className={cn(
          "fixed top-0 inset-x-0 z-50 p-4 md:p-2 flex justify-between items-start transition-all duration-300",
          // Always present border to prevent layout shift (flicker)
          "border-b border-transparent",
          // Mobile: Add blur and visibility on scroll (though scroll is disabled on mobile now)
          // We can keep it or simplify. Since mobile is no-scroll, this might not trigger on body scroll, 
          // but we'll leave logic for desktop or potential inner content. 
          // Actually, for 100vh app-like feel, header usually sits on top.
          isScrolled
            ? "bg-[var(--bg-primary)]/80 backdrop-blur-md border-white/5"
            : "",
          // Desktop: Reset styles (no border/blur needed)
          "md:bg-transparent md:backdrop-blur-none md:border-none",
          // Base interaction
          "pointer-events-none"
        )}
      >
        {/* Left: Ambuja | ACC */}
        <div className="flex items-center gap-1 md:gap-1 p-1">
          <img src={ambujaLogo} alt="Ambuja Cement" className="h-12 md:h-16 object-contain opacity-90" />
          <div className="w-px h-6 md:h-8 bg-white"></div>
          <img src={accLogo} alt="ACC" className="h-12 md:h-16 object-contain opacity-90" />
        </div>

        {/* Right: Adani Cement */}
        <div className="p-1">
          <img src={adaniLogo} alt="Adani Cement" className="h-12 md:h-16 object-contain opacity-90" />
        </div>
      </div>

      <main className="w-full flex-1 flex flex-col items-center justify-center min-h-0 pb-28 md:pb-0 md:py-12 gap-6 md:gap-12 [@media(max-width:767px)_and_(max-height:740px)]:gap-4 [@media(max-width:767px)_and_(max-height:740px)]:pb-24">

        <header className="relative pt-16 md:pt-16 [@media(max-width:767px)_and_(max-height:740px)]:pt-16 pb-4 md:pb-4 text-center space-y-4 [@media(max-width:767px)_and_(max-height:740px)]:space-y-2 shrink-0 px-4 z-20 max-w-2xl">
          <div className="space-y-0.5">
            {/*<p className="text-[#A984C7] text-[10px] md:text-sm font-medium tracking-wide uppercase">
              ADANI CEMENT CEO CLUB MEMBER
            </p>*/}
            <h1 className="text-xl md:text-4xl [@media(max-width:767px)_and_(max-height:740px)]:text-lg font-black tracking-tighter bg-gradient-to-b from-[var(--text-from)] to-[var(--text-to)] bg-clip-text text-transparent drop-shadow-sm px-4">
              {activeTemplate.headline}
            </h1>
          </div>
          <p className="text-white/80 text-sm md:text-md [@media(max-width:767px)_and_(max-height:740px)]:text-[10px] font-light tracking-wide text-center leading-relaxed">
            {activeTemplate.description}
          </p>
        </header>

        {/* Template Selector */}
        {!image && (
          <div className="flex items-center gap-4 z-40 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => setActiveTemplate(template)}
                className={cn(
                  "relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden",
                  activeTemplate.id === template.id
                    ? "bg-white/10 ring-2 ring-white/50 scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    : "hover:bg-white/5 opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
                )}
                title={template.name}
              >
                <img
                  src={template.logoSrc}
                  alt={template.name}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        )}

        {!image ? (
          <div className="flex flex-col items-center justify-center gap-6 md:gap-12 [@media(max-width:767px)_and_(max-height:740px)]:gap-4 w-full max-w-lg md:max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* 3:4 Hero Card Container - Width-Based Scaling */}
            {/* Mobile: Width calc(100% - 48px) capped at 320px. Desktop: max 360px */}
            {/* Short Screen: Cap at 260px to prevent overlap */}
            <TiltCard
              className="relative w-[calc(100%-48px)] max-w-[320px] [@media(max-width:767px)_and_(max-height:740px)]:max-w-[260px] md:w-full md:max-w-[360px] aspect-[3/4] shrink-1 md:shrink-0 transition-all"
              tiltClassName="bg-gradient-to-br from-[var(--card-from)] to-[var(--card-to)] rounded-[2rem] border border-[var(--card-border)] shadow-2xl flex items-center justify-center p-6 overflow-hidden transition-colors duration-500"
            >

              {/* Bottom Badge Text */}
              <div className="absolute bottom-6 [@media(max-width:767px)_and_(max-height:740px)]:bottom-4 inset-x-0 z-30 pointer-events-none flex justify-center">
                <p className="text-white/80 text-[12px] md:text-sm font-semibold tracking-[0.2em] uppercase text-center">
                  {activeTemplate.subtitle}
                </p>
              </div>

              {/* Static Hero Image with Ring Frame */}
              <div className="relative w-[85%] aspect-square shrink-0">
                {/* Ring Image (Frame) */}
                <div key={activeTemplate.frameSrc /* Force re-render on change */} className="absolute inset-0 z-20 pointer-events-none animate-in fade-in duration-500">
                  <img src={activeTemplate.frameSrc} alt="" className="w-full h-full object-contain" />
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
                <div className="absolute inset-4 -z-10 rounded-full bg-[var(--accent-glow)] blur-3xl transition-colors duration-500"></div>
              </div>

              {/* Card Gloss Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
            </TiltCard>

            {/* Upload Button */}
            <div className="fixed bottom-12 [@media(max-width:767px)_and_(max-height:740px)]:bottom-8 left-0 right-0 px-6 md:static md:p-0 md:w-full flex justify-center z-50 transition-all">
              <div className="w-full md:max-w-[360px] relative group shrink-0">
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
                  className="[@media(max-width:767px)_and_(max-height:740px)]:h-10 [@media(max-width:767px)_and_(max-height:740px)]:text-sm"
                >
                  <Upload className="w-5 h-5 [@media(max-width:767px)_and_(max-height:740px)]:w-4 [@media(max-width:767px)_and_(max-height:740px)]:h-4 text-white/80 group-hover:text-white transition-colors" />
                  <span className="font-semibold text-base md:text-lg [@media(max-width:767px)_and_(max-height:740px)]:text-sm">Upload Photo</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <ImageProcessor
            file={image}
            onReset={() => setImage(null)}
            frameSrc={activeTemplate.frameSrc}
            theme={activeTemplate.theme}
          />
        )}
      </main>
    </div>
  )
}

export default App
