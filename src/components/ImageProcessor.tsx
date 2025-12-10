// Consolidated draw function
import { useEffect, useRef, useState } from 'react'
import { Download, RefreshCw, X } from 'lucide-react'
import { drawOnCanvas, downloadCanvas } from '../utils/canvasUtils'


// Import ring asset
import ringPath from '../assets/ring.png'

interface ImageProcessorProps {
    file: File
    onReset: () => void
}

export function ImageProcessor({ file, onReset }: ImageProcessorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        generateImage()
    }, [file])

    const generateImage = async () => {
        const canvas = canvasRef.current
        if (!canvas) return

        setLoading(true)
        try {
            await drawOnCanvas(canvas, file, ringPath)
        } catch (error) {
            console.error("Failed to generate image:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = () => {
        if (!canvasRef.current) return
        const filename = `insignia-${file.name.split('.')[0]}-${Date.now()}.png`
        downloadCanvas(canvasRef.current, filename)
    }

    return (
        <div className="w-full flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">

            {/* Main Preview Area */}
            <div className="flex-1 flex items-center justify-center min-h-0 w-full p-4">
                <div className="relative w-full max-w-[320px] aspect-square sm:max-w-[400px]">
                    <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border border-white/10 bg-black">
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full object-contain"
                        />
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 rounded-full">
                                <RefreshCw className="w-8 h-8 text-white animate-spin" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            {/* Simple Controls */}
            <div className="flex items-center justify-center gap-6">
                <button
                    onClick={onReset}
                    className="p-4 text-neutral-400 hover:text-red-400 hover:bg-neutral-800/50 rounded-full transition-all hover:scale-105 active:scale-95"
                    title="Remove Image"
                >
                    <X className="w-6 h-6" />
                </button>

                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-xl shadow-white/10 hover:shadow-white/20 transition-all hover:scale-105 active:scale-95"
                >
                    <Download className="w-5 h-5" />
                    <span>Download Emblem</span>
                </button>
            </div>

        </div>
    )
}
