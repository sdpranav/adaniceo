import { useState } from 'react'
import { Upload } from 'lucide-react'

import { ImageProcessor } from './components/ImageProcessor'
import { TiltCard } from './components/TiltCard'
import heroImage from './assets/hero.jpg'
import ringPath from './assets/ring.png'

function App() {
  const [image, setImage] = useState<File | null>(null)

  return (
    <div className="h-[100dvh] bg-background text-foreground flex flex-col items-center p-4 selection:bg-blue-500/30 overflow-hidden">
      <header className="relative pt-4 md:pt-12 text-center space-y-1 md:space-y-4 shrink-0 px-4 z-20">
        <p className="text-neutral-400 text-xs md:text-lg font-medium tracking-wide uppercase">
          Adani Cement CEO Club
        </p>
        <h1 className="text-2xl md:text-4xl font-black tracking-tighter bg-gradient-to-br from-white via-white to-neutral-500 bg-clip-text text-transparent drop-shadow-sm px-4">
          Are you a proud member?
        </h1>
      </header>

      <main className="w-full flex-1 flex flex-col items-center justify-center min-h-0 py-4">
        {!image ? (
          <div className="flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-sm md:max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 h-full">

            {/* 3:4 Hero Card Container - Responsive Height-Based Scaling */}
            {/* Using height to determine size ensures it fits within the viewport vertically */}
            {/* 3:4 Hero Card Container - Responsive Height-Based Scaling */}
            {/* Using height to determine size ensures it fits within the viewport vertically */}
            <TiltCard
              className="relative h-[55vh] max-h-[500px] w-auto aspect-[3/4] shrink-0"
              tiltClassName="bg-[#130029] rounded-[2rem] border border-[#2B005C] shadow-2xl flex items-center justify-center p-6 overflow-hidden"
            >

              {/* Badge Text */}
              <div className="absolute top-6 inset-x-0 z-30 pointer-events-none flex justify-center">
                <p className="text-white/40 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-center">
                  I am a proud member
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
            <div className="w-full max-w-xs md:max-w-md relative group shrink-0">
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
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center gap-3 w-full py-3 md:py-4 px-6 md:px-8 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl cursor-pointer border border-neutral-800 hover:border-neutral-700 transition-all duration-300 shadow-xl shadow-black/50 group-hover:shadow-blue-900/10 group-hover:scale-[1.02]"
              >
                <Upload className="w-5 h-5 text-neutral-400 group-hover:text-blue-400 transition-colors" />
                <span className="font-semibold text-base md:text-lg">Upload Photo</span>
              </label>
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
