export const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}

// Consolidated draw function
export const drawComposedImage = (
    ctx: CanvasRenderingContext2D,
    baseImage: HTMLImageElement,
    ringImage: HTMLImageElement | null,
    size: number,
    offset: { x: number, y: number },
    scale: number
) => {
    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Content Scaling Factor to ensure image sits INSIDE the ring
    const CONTENT_SCALE = 0.95
    const maskRadius = (size / 2) * CONTENT_SCALE

    // 1. Draw Circular Mask
    ctx.save()
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, maskRadius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    // 2. Draw Base Image with Offset
    const imgWidth = baseImage.width * scale
    const imgHeight = baseImage.height * scale

    // Center center + offset
    const centerX = size / 2
    const centerY = size / 2

    // Draw centered relative to the canvas center, plus user offset
    // image center is at (x + width/2, y + height/2)
    // we want image center to be at (centerX + offsetX, centerY + offsetY)
    // so x = centerX + offsetX - width/2
    const x = centerX + offset.x - imgWidth / 2
    const y = centerY + offset.y - imgHeight / 2

    ctx.drawImage(baseImage, x, y, imgWidth, imgHeight)
    ctx.restore() // Remove clip for subsequent overlays

    // 3. Draw Ring Overlay (if available) - Draws at full size 1.0
    if (ringImage) {
        ctx.drawImage(ringImage, 0, 0, size, size)
    }
}

export const getInitialScale = (containerSize: number, imageWidth: number, imageHeight: number): number => {
    // Calculate scale to cover the container (like object-fit: cover)
    return Math.max(containerSize / imageWidth, containerSize / imageHeight)
}

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
}
