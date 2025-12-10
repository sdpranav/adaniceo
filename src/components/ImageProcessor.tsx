import { useEffect, useRef, useState } from 'react'
import { Download, RefreshCw, RotateCcw } from 'lucide-react'
import { drawComposedImage, downloadCanvas, loadImage, getInitialScale } from '../utils/canvasUtils'
import { Button } from './Button'


// Import ring asset
import ringPath from '../assets/ring.png'

interface ImageProcessorProps {
    file: File
    onReset: () => void
}

// Helper functions imported from canvasUtils



export function ImageProcessor({ file, onReset }: ImageProcessorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [loading, setLoading] = useState(false)

    // Refs for interaction state to avoid re-renders during drag
    const baseImageRef = useRef<HTMLImageElement | null>(null)
    const ringImageRef = useRef<HTMLImageElement | null>(null)
    const offsetRef = useRef({ x: 0, y: 0 })
    const scaleRef = useRef(1)
    const isDraggingRef = useRef(false)
    const lastPosRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        loadAssets()
    }, [file])

    const loadAssets = async () => {
        const canvas = canvasRef.current
        if (!canvas) return

        setLoading(true)
        try {
            // Load base image
            const baseImg = await loadImage(URL.createObjectURL(file))
            baseImageRef.current = baseImg

            // Load ring image
            const ringImg = await loadImage(ringPath)
            ringImageRef.current = ringImg

            // Initial Setup
            const size = 1000 // High res internal size
            canvas.width = size
            canvas.height = size

            // Calculate initial fit
            scaleRef.current = getInitialScale(size, baseImg.width, baseImg.height)
            offsetRef.current = { x: 0, y: 0 } // Reset offset

            draw()
        } catch (error) {
            console.error("Failed to load assets:", error)
        } finally {
            setLoading(false)
        }
    }

    const draw = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx || !baseImageRef.current) return

        drawComposedImage(
            ctx,
            baseImageRef.current,
            ringImageRef.current,
            canvas.width,
            offsetRef.current,
            scaleRef.current
        )
    }

    // Interaction Handlers
    const handleStart = (clientX: number, clientY: number) => {
        isDraggingRef.current = true
        lastPosRef.current = { x: clientX, y: clientY }
    }

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDraggingRef.current) return

        const deltaX = clientX - lastPosRef.current.x
        const deltaY = clientY - lastPosRef.current.y
        lastPosRef.current = { x: clientX, y: clientY }

        // Adjust offset based on canvas display vs internal resolution
        // The canvas is displayed at say 300px but internal is 1000px
        // We need to scale the delta movement to match internal resolution
        if (canvasRef.current && baseImageRef.current) {
            const rect = canvasRef.current.getBoundingClientRect()
            const ratio = canvasRef.current.width / rect.width

            const newX = offsetRef.current.x + deltaX * ratio
            const newY = offsetRef.current.y + deltaY * ratio

            // Calculate Limits
            // We want to ensure image edges never come INSIDE the canvas edges
            // So offset must be within +/- (scaledSize - canvasSize) / 2
            const canvasSize = canvasRef.current.width
            const scaledWidth = baseImageRef.current.width * scaleRef.current
            const scaledHeight = baseImageRef.current.height * scaleRef.current

            const maxOffsetX = Math.max(0, (scaledWidth - canvasSize) / 2)
            const maxOffsetY = Math.max(0, (scaledHeight - canvasSize) / 2)

            // Clamp
            offsetRef.current.x = Math.max(-maxOffsetX, Math.min(maxOffsetX, newX))
            offsetRef.current.y = Math.max(-maxOffsetY, Math.min(maxOffsetY, newY))
        }

        draw()
    }

    const handleEnd = () => {
        isDraggingRef.current = false
    }

    const handleDownload = () => {
        if (!canvasRef.current || !file) return
        const filename = `insignia-${file.name.split('.')[0]}-${Date.now()}.png`
        downloadCanvas(canvasRef.current, filename)
    }

    return (
        <div className="w-full flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">

            {/* Main Preview Area */}
            <div className="flex-1 flex items-center justify-center min-h-0 w-full p-4">
                <div className="relative w-full max-w-[320px] aspect-square sm:max-w-[400px] md:max-w-[450px]">
                    <div
                        className="w-full h-full rounded-full overflow-hidden shadow-2xl border border-white/10 bg-black touch-none cursor-move"
                        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                        onMouseUp={handleEnd}
                        onMouseLeave={handleEnd}
                        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
                        onTouchMove={(e) => {
                            // Prevent scrolling while dragging image
                            if (e.cancelable) e.preventDefault()
                            handleMove(e.touches[0].clientX, e.touches[0].clientY)
                        }}
                        onTouchEnd={handleEnd}
                    >
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full object-contain pointer-events-none"
                        />
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 rounded-full">
                                <RefreshCw className="w-8 h-8 text-white animate-spin" />
                            </div>
                        )}

                    </div>

                    {/* Drag Hint - Now below the ring */}
                    {!loading && (
                        <div className="mt-4 text-center animate-in fade-in duration-700">
                            <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium">Drag to Reposition</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col items-center gap-4 w-full max-w-xs md:max-w-md">
                <Button onClick={handleDownload}>
                    <Download className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                    <span className="font-semibold text-base md:text-lg">Download Emblem</span>
                </Button>

                <button
                    onClick={onReset}
                    className="flex items-center gap-2 text-neutral-500 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                </button>
            </div>

        </div>
    )
}
