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
export const drawOnCanvas = async (
    canvas: HTMLCanvasElement,
    imageFile: File,
    ringSrc?: string
) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Load images
    const baseImage = await loadImage(URL.createObjectURL(imageFile))

    let ringImage: HTMLImageElement | null = null
    if (ringSrc) {
        ringImage = await loadImage(ringSrc)
    }

    // Determine size based on smaller dimension (Square Canvas)
    const size = Math.min(baseImage.width, baseImage.height)
    canvas.width = size
    canvas.height = size

    // Content Scaling Factor to ensure image sits INSIDE the ring
    const CONTENT_SCALE = 0.95
    const maskRadius = (size / 2) * CONTENT_SCALE

    // 1. Draw Circular Mask
    ctx.save()
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, maskRadius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    // 2. Draw Base Image (Center Crop)
    // We scale the image to cover the full canvas size to ensure it fills the mask completely
    // The mask will do the trimming.
    const scale = Math.max(size / baseImage.width, size / baseImage.height)
    const scaledWidth = baseImage.width * scale
    const scaledHeight = baseImage.height * scale
    const x = (size - scaledWidth) / 2
    const y = (size - scaledHeight) / 2

    ctx.drawImage(baseImage, x, y, scaledWidth, scaledHeight)
    ctx.restore() // Remove clip for subsequent overlays

    // 3. Draw Ring Overlay (if available) - Draws at full size 1.0
    if (ringImage) {
        ctx.drawImage(ringImage, 0, 0, size, size)
    }
}

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
}
