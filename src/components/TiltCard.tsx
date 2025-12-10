import { useRef } from 'react'
import type { MouseEvent, TouchEvent, ReactNode } from 'react'
import { cn } from '../lib/utils'

interface TiltCardProps {
    children: ReactNode
    className?: string // For sizing/layout of the container
    tiltClassName?: string // For visuals (bg, border) that should tilt with the content
}

export function TiltCard({ children, className, tiltClassName }: TiltCardProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)

    const updateTilt = (clientX: number, clientY: number) => {
        if (!containerRef.current || !innerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top

        // Calculate percentage (-1 to 1)
        const xPct = (x / rect.width - 0.5) * 2
        const yPct = (y / rect.height - 0.5) * 2

        // Set CSS variables for rotation (Increased range to 20deg for more dramatic effect)
        innerRef.current.style.setProperty('--x', `${yPct * -20}deg`)
        innerRef.current.style.setProperty('--y', `${xPct * 20}deg`)

        // Glare position
        innerRef.current.style.setProperty('--bx', `${50 - xPct * 20}%`)
        innerRef.current.style.setProperty('--by', `${50 - yPct * 20}%`)
        innerRef.current.style.setProperty('--o', '1')
    }

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        updateTilt(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches[0]) {
            updateTilt(e.touches[0].clientX, e.touches[0].clientY)
        }
    }

    const handleReset = () => {
        if (!innerRef.current) return

        // Reset
        innerRef.current.style.setProperty('--x', '0deg')
        innerRef.current.style.setProperty('--y', '0deg')
        innerRef.current.style.setProperty('--o', '0')
    }

    return (
        <div
            ref={containerRef}
            className={cn("relative perspective-1200", className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleReset}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleReset}
            onTouchCancel={handleReset}
            style={{
                perspective: '1200px',
                touchAction: 'none' // Prevent scroll while interacting
            }}
        >
            <div
                ref={innerRef}
                className={cn(
                    "w-full h-full relative transition-all preserve-3d will-change-transform",
                    "hover:transition-none ease-out", // Disable transition on hover for instant tracking
                    tiltClassName
                )}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(var(--x, 0deg)) rotateY(var(--y, 0deg))',
                    transitionDuration: '300ms' // Smooth reset on leave
                }}
            >
                {children}

                {/* Glare Effect */}
                <div
                    className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden transition-opacity duration-300 z-50"
                    style={{
                        background: 'radial-gradient(circle at var(--bx, 50%) var(--by, 50%), rgba(255,255,255,0.15) 0%, transparent 50%)',
                        opacity: 'var(--o, 0)',
                    }}
                />
            </div>
        </div>
    )
}
